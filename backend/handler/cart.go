package handler

import (
	"errors"
	"math"

	"github.com/gofiber/fiber/v2"
	"github.com/prachotx/e-commerce-react-golang/database"
	"github.com/prachotx/e-commerce-react-golang/model"
	"gorm.io/gorm"
)

func GetCartItems(c *fiber.Ctx) error {
	userID := c.Locals("user_id")

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

	var cart model.Cart
	if err := database.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart"})
	}

	query := database.DB.Model(&model.CartItem{})

	var total int64
	if err := query.Where("cart_id = ?", cart.ID).Count(&total).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to count cart items"})
	}

	var cartItems []struct {
		CartItemID uint    `json:"cart_item_id"`
		ProductID  uint    `json:"product_id"`
		Name       string  `json:"name"`
		Price      float64 `json:"price"`
		Quantity   int     `json:"quantity"`
		Total      float64 `json:"total"`
	}

	if err := database.DB.Table("cart_items").
		Select("cart_items.id as cart_item_id, cart_items.product_id, products.name, products.price, cart_items.quantity,  (cart_items.quantity * products.price) as total").
		Joins("JOIN products ON cart_items.product_id = products.id").
		Where("cart_items.cart_id = ?", cart.ID).
		Limit(limit).
		Offset(offset).
		Scan(&cartItems).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart items not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart items"})
	}
	if len(cartItems) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no cart items in cart"})
	}

	var totalAmount float64
	for _, item := range cartItems {
		totalAmount += item.Total
	}
	totalAmount = math.Round(totalAmount*100) / 100

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"cart_items":   cartItems,
		"total_amount": totalAmount,
		"page":         page,
		"limit":        limit,
		"total":        total,
		"total_pages":  (total + int64(limit) - 1) / int64(limit),
	})
}

func CreateCartItem(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	var input model.CartItem
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	var cart model.Cart
	if err := database.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			cart = model.Cart{
				UserID: userID,
			}
			if err := database.DB.Create(&cart).Error; err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to create cart"})
			}
		} else {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart"})
		}
	}

	var product model.Product
	if err := database.DB.First(&product, input.ProductID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch product"})
	}

	if product.Stock < input.Quantity || product.Stock <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "not enough stock available"})
	}

	product.Stock -= input.Quantity
	if err := database.DB.Save(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update stock"})
	}

	var cartItem model.CartItem
	if err := database.DB.Where("cart_id = ? AND product_id = ?", cart.ID, input.ProductID).First(&cartItem).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			cartItem = model.CartItem{
				CartID:    cart.ID,
				ProductID: input.ProductID,
				Quantity:  input.Quantity,
			}
			if err := database.DB.Create(&cartItem).Error; err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to add product to cart"})
			}
		} else {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart item"})
		}
	} else {
		cartItem.Quantity += input.Quantity
		if err := database.DB.Save(&cartItem).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update cart item"})
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":   "product added to cart",
		"cart_item": cartItem,
	})
}

func UpdateCartItem(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	id := c.Params("id")

	var cart model.Cart
	if err := database.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart"})
	}

	var input struct {
		Quantity int `json:"quantity"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	var cartItem model.CartItem
	if err := database.DB.Where("id = ? AND cart_id = ?", id, cart.ID).First(&cartItem).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart item not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart item"})
	}

	var product model.Product
	if err := database.DB.First(&product, cartItem.ProductID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch product"})
	}

	if input.Quantity == 0 {
		if err := database.DB.Unscoped().Delete(&cartItem).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to delete cart item"})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "deleted cart item"})
	}

	stockChange := input.Quantity - cartItem.Quantity

	if stockChange > 0 && product.Stock < stockChange {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "not enough stock available"})
	}

	product.Stock -= stockChange

	if stockChange != 0 {
		if err := database.DB.Save(&product).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update product stock"})
		}
	}

	cartItem.Quantity = input.Quantity
	if err := database.DB.Save(&cartItem).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update cart item"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":   "cart item updated",
		"cart_item": cartItem,
	})
}

func DeleteCartItem(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	id := c.Params("id")

	var cart model.Cart
	if err := database.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart"})
	}

	var cartItem model.CartItem
	if err := database.DB.Where("id = ? AND cart_id = ?", id, cart.ID).First(&cartItem).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart item not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart item"})
	}

	var product model.Product
	if err := database.DB.First(&product, cartItem.ProductID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "product not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch product"})
	}
	product.Stock += cartItem.Quantity
	if err := database.DB.Save(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to update product"})
	}

	if err := database.DB.Where("cart_id = ?", cart.ID).Unscoped().Delete(&cartItem, id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to delete cart item"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "deleted cart item"})
}
