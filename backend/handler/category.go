package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/prachotx/e-commerce-react-golang/database"
	"github.com/prachotx/e-commerce-react-golang/model"
	"gorm.io/gorm"
)

func GetCategorys(c *fiber.Ctx) error {
	// pagination
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}
	offset := (page - 1) * limit
	//
	query := database.DB.Model(&model.Category{})

	var total int64
	query.Count(&total)

	var categorys []model.Category
	if err := query.Limit(limit).Offset(offset).Preload("Products").Find(&categorys).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch categorys"})
	}
	if len(categorys) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no category in shop"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"categorys":  categorys,
		"page":       page,
		"limit":      limit,
		"total":      total,
		"total_page": (total + int64(limit) - 1) / int64(limit),
	})
}

func GetCategory(c *fiber.Ctx) error {
	id := c.Params("id")

	var category model.Category
	if err := database.DB.Preload("Products").First(&category, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "category not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch category"})
	}

	return c.Status(fiber.StatusOK).JSON(category)
}

func CreateCategory(c *fiber.Ctx) error {
	var category model.Category
	if err := c.BodyParser(&category); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	if err := database.DB.Create(&category).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to create category"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":  "create category success !",
		"category": category,
	})
}

func UpdateCategory(c *fiber.Ctx) error {
	id := c.Params("id")

	var category model.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "category not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch category"})
	}

	if err := c.BodyParser(&category); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	if err := database.DB.Save(&category).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update category"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "update category success !",
		"category": category,
	})
}

func DateleCategory(c *fiber.Ctx) error {
	id := c.Params("id")

	var category model.Category
	if err := database.DB.Unscoped().Delete(&category, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "category not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to delete category"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "delete category success !"})
}
