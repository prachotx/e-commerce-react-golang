package handler

import (
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/prachotx/e-commerce-react-golang/database"
	"github.com/prachotx/e-commerce-react-golang/model"
	"gorm.io/gorm"
)

func GetProducts(c *fiber.Ctx) error {
	search := c.Query("search", "")
	min := c.QueryInt("min", 0)
	max := c.QueryInt("max", 0)
	inStock := c.QueryBool("in_stock", false)
	sort := c.Query("sort", "desc")
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

	query := database.DB.Model(&model.Product{})

	if search != "" {
		query = query.Where("name ILIKE ?", "%"+search+"%")
	}
	if min > 0 && max > 0 {
		query = query.Where("price BETWEEN ? AND ?", min, max)
	} else if min > 0 {
		query = query.Where("price >= ?", min)
	} else if max > 0 {
		query = query.Where("price <= ?", max)
	}
	if inStock {
		query = query.Where("stock > 0")
	}
	if sort != "" {
		query = query.Order("price " + sort)
	}

	var total int64
	query.Count(&total)

	var products []model.Product
	if err := query.Limit(limit).Offset(offset).Find(&products).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch products"})
	}
	if len(products) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no product in store"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"products":   products,
		"page":       page,
		"limit":      limit,
		"total":      total,
		"total_page": (total + int64(limit) - 1) / int64(limit),
	})
}

func GetProduct(c *fiber.Ctx) error {
	id := c.Params("id")

	var product model.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch product"})
	}

	return c.Status(fiber.StatusOK).JSON(product)
}

func CreateProduct(c *fiber.Ctx) error {
	var product model.Product
	if err := c.BodyParser(&product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	if err := database.DB.Create(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to create product"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "create product success !",
		"product": product,
	})
}

func UploadProductImage(c *fiber.Ctx) error {
	file, err := c.FormFile("image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "failed to get file"})
	}

	const maxFileSize = 2 * 1024 * 1024
	if file.Size > maxFileSize {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "file size exceeds 2 MB limit"})
	}

	if !isValidImage(file) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid file type"})
	}

	if !isAllowedExtension(file.Filename) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "unsupported file extension"})
	}

	filePath := fmt.Sprintf("/uploads/%s", file.Filename)

	if err := c.SaveFile(file, filePath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to save file"})
	}

	productID := c.FormValue("product_id")
	var product model.Product
	if err := database.DB.First(&product, productID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch product"})
	}

	product.ImagePath = filePath
	if err := database.DB.Save(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update product"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":    "upload file success !",
		"image_path": filePath,
	})
}

func UpdateProduct(c *fiber.Ctx) error {
	id := c.Params("id")

	var product model.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch product"})
	}

	if err := c.BodyParser(&product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	if err := database.DB.Save(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update product"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "update product success !",
		"product": product,
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	id := c.Params("id")

	var product model.Product
	if err := database.DB.Unscoped().Delete(&product, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to delete product"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "delete product success !"})
}
