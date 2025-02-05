package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/prachotx/e-commerce-react-golang/database"
	"github.com/prachotx/e-commerce-react-golang/model"
)

func GetPromotedProducts(c *fiber.Ctx) error {
	var products []model.Product
	if err := database.DB.Order("discount DESC").Where("discount > 0").Find(&products).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch products"})
	}

	return c.Status(fiber.StatusOK).JSON(products)
}
