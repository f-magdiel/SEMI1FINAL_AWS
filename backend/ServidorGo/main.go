package main

import (
	rds "github/LDGA45/SEMI1_Partica1/controller/rds"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	//Rutas para el servicio de RDS
	app.Post("/rds/registeUser", rds.InsertarUsuario)
	app.Post("/rds/iniciousuario", rds.Login)
	app.Get("/rds/paginaInicio", rds.PaginaInicio)
	app.Get("/rds/PAA", rds.DatosCredenciales)
	app.Post("/rds/ActualizarDatosPerfil", rds.ActualizacionDatos)
	app.Post("/rds/ActualizarFotoPerfil", rds.ActualizarFotoPerfil)

	app.Listen(":5000")
}
