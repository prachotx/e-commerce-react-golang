package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
)

// read id, role from cookie set at local
func Authenticate(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "unauthorized"})
	}

	if err := godotenv.Load(".env"); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "failed to load env"})
	}
	jwtSecretKey := os.Getenv("JWT_SECRET_KEY")

	token, err := jwt.ParseWithClaims(cookie, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecretKey), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "fail to read token"})
	}

	claims := token.Claims.(jwt.MapClaims)
	c.Locals("user_id", claims["user_id"])
	c.Locals("role", claims["role"])

	return c.Next()
}

// check role = admin
func AuthorizeAdmin(c *fiber.Ctx) error {
	role := c.Locals("role")

	if role != "ADMIN" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"message": "forbidden"})
	}

	return c.Next()
}
