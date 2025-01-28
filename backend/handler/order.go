package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/prachotx/e-commerce-react-golang/database"
	"github.com/prachotx/e-commerce-react-golang/model"
	"gorm.io/gorm"
)

func CreateOrder(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	var cart model.Cart
	if err := database.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "cart not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart"})
	}

	var cartItems []model.CartItem
	if err := database.DB.Preload("Product").Where("cart_id = ?", cart.ID).Find(&cartItems).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch cart items"})
	}
	if len(cartItems) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no items in cart"})
	}

	var totalAmount float64
	for _, item := range cartItems {
		totalAmount += float64(item.Quantity) * item.Product.Price
	}

	var input model.Address
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "invalid request body"})
	}

	order := model.Order{
		UserID:      userID,
		TotalAmount: totalAmount,
		Address:     input.Address,
		Province:    input.Province,
		District:    input.District,
		SubDistrict: input.SubDistrict,
		Postcode:    input.Postcode,
		Status:      "pending",
	}
	if err := database.DB.Create(&order).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to create order"})
	}

	for _, item := range cartItems {
		orderItem := model.OrderItem{
			OrderID:   order.ID,
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
			Price:     float64(item.Quantity) * item.Product.Price,
		}
		if err := database.DB.Create(&orderItem).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to create order item"})
		}
	}

	if err := database.DB.Where("cart_id = ?", cart.ID).Unscoped().Delete(&model.CartItem{}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to delete cart item"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "create order success !",
		"order":   order,
	})
}

func GetOrders(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

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

	query := database.DB.Model(&model.Order{})

	var total int64
	if err := query.Where("user_id = ?", userID).Count(&total).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to count orders"})
	}

	var orders []model.Order
	if err := database.DB.Where("user_id = ?", userID).Limit(limit).Offset(offset).Find(&orders).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch orders"})
	}
	if len(orders) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no orders"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"orders":      orders,
		"page":        page,
		"limit":       limit,
		"total":       total,
		"total_pages": (total + int64(limit) - 1) / int64(limit),
	})
}

func GetOrderDetail(c *fiber.Ctx) error {
	userID := convertToUint(c.Locals("user_id"))

	id := c.Params("id")
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

	var order model.Order
	if err := database.DB.Where("id = ? AND user_id = ?", id, userID).First(&order).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "order not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch order"})
	}

	query := database.DB.Model(&model.OrderItem{})

	var total int64
	if err := query.Where("order_id = ?", order.ID).Count(&total).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to count order items"})
	}

	var orderItems []model.OrderItem
	if err := database.DB.Where("order_id = ?", order.ID).Limit(limit).Offset(offset).First(&orderItems).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to fetch order item"})
	}
	if len(orderItems) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "no order items"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"order":       order,
		"order_items": orderItems,
		"page":        page,
		"limit":       limit,
		"total":       total,
		"total_pages": (total + int64(limit) - 1) / int64(limit),
	})
}
