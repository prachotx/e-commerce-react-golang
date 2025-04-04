package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/prachotx/e-commerce-react-golang/database"
	"github.com/prachotx/e-commerce-react-golang/handler"
	"github.com/prachotx/e-commerce-react-golang/middleware"
	"github.com/prachotx/e-commerce-react-golang/model"
)

func main() {
	database.Connect()

	database.DB.AutoMigrate(&model.User{})
	database.DB.AutoMigrate(&model.Address{})
	database.DB.AutoMigrate(&model.Product{})
	database.DB.AutoMigrate(&model.Order{})
	database.DB.AutoMigrate(&model.OrderItem{})
	database.DB.AutoMigrate(&model.Cart{})
	database.DB.AutoMigrate(&model.CartItem{})

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
	}))

	app.Get("/landing", handler.GetPromotedProducts)

	app.Post("/users/register", handler.RegisterUser)
	app.Post("/users/login", handler.LoginUser)
	app.Get("/users/profile", middleware.Authenticate, handler.GetUser)
	app.Put("/users/profile", middleware.Authenticate, handler.UpdateUser)

	app.Get("/users/address", middleware.Authenticate, handler.GetAddresses)
	app.Get("/users/address/:id", middleware.Authenticate, handler.GetAddress)
	app.Post("/users/address", middleware.Authenticate, handler.CreateAddress)
	app.Put("/users/address/:id", middleware.Authenticate, handler.UpdateAddress)
	app.Delete("/users/address/:id", middleware.Authenticate, handler.DeleteAddress)

	app.Get("/products", handler.GetProducts)
	app.Get("/products/:id", handler.GetProduct)
	app.Post("/products", middleware.Authenticate, middleware.AuthorizeAdmin, handler.CreateProduct)
	app.Post("/uploads", middleware.Authenticate, middleware.AuthorizeAdmin, handler.UploadProductImage)
	app.Put("/products/:id", middleware.Authenticate, middleware.AuthorizeAdmin, handler.UpdateProduct)
	app.Delete("/products/:id", middleware.Authenticate, middleware.AuthorizeAdmin, handler.DeleteProduct)

	app.Get("/categorys", handler.GetCategorys)
	app.Get("/categorys/:id", handler.GetCategory)
	app.Post("/categorys", middleware.Authenticate, middleware.AuthorizeAdmin, handler.CreateCategory)
	app.Put("/categorys/:id", middleware.Authenticate, middleware.AuthorizeAdmin, handler.UpdateCategory)
	app.Delete("/categorys/:id", middleware.Authenticate, middleware.AuthorizeAdmin, handler.DateleCategory)

	app.Get("/orders", middleware.Authenticate, handler.GetUserOrders)
	app.Get("/orders/:id", middleware.Authenticate, handler.GetOrderDetail)
	app.Get("/admin/orders", middleware.Authenticate, middleware.AuthorizeAdmin, handler.GetAllOrders)
	app.Post("/orders", middleware.Authenticate, handler.CreateOrders)
	app.Post("/orders/single", middleware.Authenticate, handler.CreateOrder)

	app.Get("/cart", middleware.Authenticate, handler.GetCartItems)
	app.Post("/cart", middleware.Authenticate, handler.CreateCartItem)
	app.Put("/cart/:id", middleware.Authenticate, handler.UpdateCartItem)
	app.Delete("/cart/:id", middleware.Authenticate, handler.DeleteCartItem)

	app.Listen(":8080")
}
