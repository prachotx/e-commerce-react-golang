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
	// database.DB.AutoMigrate(&Payment{})

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
	}))

	app.Post("/users/register", handler.CreateUser)
	app.Post("/users/login", handler.LoginUser)
	app.Get("/users/profile", middleware.Authenticate, handler.GetUser)
	app.Put("/users/profile", middleware.Authenticate, handler.UpdateUser)

	app.Get("/users/address", middleware.Authenticate, handler.GetUserAddress)
	app.Get("/users/address/:id", middleware.Authenticate, handler.GetUserAddressByID)
	app.Post("/users/address", middleware.Authenticate, handler.CreateUserAddress)
	app.Put("/users/address/:id", middleware.Authenticate, handler.UpdateUserAddress)
	app.Delete("/users/address/:id", middleware.Authenticate, handler.DeleteUserAddress)

	app.Get("/landing", handler.GetPromotedProducts)

	app.Get("/products", handler.GetProducts)
	app.Get("/products/:id", handler.GetProduct)
	app.Post("/products", middleware.Authenticate, middleware.AuthorizeAdmin, handler.CreateProduct)
	app.Post("/uploads", middleware.Authenticate, middleware.AuthorizeAdmin, handler.UploadProductImage)
	app.Put("/products/:id", middleware.Authenticate, middleware.AuthorizeAdmin, handler.UpdateProduct)
	app.Delete("/products/:id", middleware.Authenticate, middleware.AuthorizeAdmin, handler.DeleteProduct)

	app.Post("/orders/:id", middleware.Authenticate, handler.CreateOrder)
	app.Get("/orders", middleware.Authenticate, handler.GetOrders)
	app.Get("/orders/:id", middleware.Authenticate, handler.GetOrderDetail)

	app.Get("/cart", middleware.Authenticate, handler.GetCartItems)
	app.Post("/cart", middleware.Authenticate, handler.CreateCartItem)
	app.Put("/cart/:id", middleware.Authenticate, handler.UpdateCartItem)
	app.Delete("/cart/:id", middleware.Authenticate, handler.DeleteCartItem)

	app.Listen(":8080")
}
