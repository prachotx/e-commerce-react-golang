package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/prachotx/e-commerce-xs/database"
	"github.com/prachotx/e-commerce-xs/model"
	"gorm.io/gorm"
)

func GetUserAddress(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	var address []model.Address
	if err := database.DB.Where("user_id = ?", userID).Find(&address).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch address"})
	}
	if len(address) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no address"})
	}

	return c.Status(fiber.StatusOK).JSON(address)
}

func GetUserAddressByID(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	id := c.Params("id")

	var address model.Address
	if err := database.DB.Where("user_id", userID).First(&address, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "address not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch address"})
	}

	return c.Status(fiber.StatusOK).JSON(address)
}

func CreateUserAddress(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	var address model.Address
	if err := c.BodyParser(&address); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}
	address.UserID = userID

	if err := database.DB.Create(&address).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to create address"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "create address success !",
		"address": address,
	})
}

func UpdateUserAddress(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	id := c.Params("id")

	var address model.Address
	if err := database.DB.Where("user_id = ?", userID).First(&address, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "address not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch address"})
	}

	if err := c.BodyParser(&address); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	if err := database.DB.Where("user_id = ?", userID).Save(&address).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update address"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "update address success !",
		"address": address,
	})
}

func DeleteUserAddress(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	id := c.Params("id")

	var address model.Address
	if err := database.DB.Where("user_id = ?", userID).Delete(&address, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "address not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to delete address"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "delete address success !"})
}
