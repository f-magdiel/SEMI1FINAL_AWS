package rds

import (
	"crypto/md5"
	"database/sql"
	"fmt"
	s3 "github/LDGA45/SEMI1_Partica1/controller/s3"
	"log"
	"os"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

var idUsuarioLogueado string

// Struct para el usuario
type Usuario struct {
	User     string `json:"user"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Base64   string `json:"base64"`
	NameFoto string `json:"namefoto"`
}

// para el login de usuarios
type UsuarioLogin struct {
	User     string `json:"user"`
	Password string `json:"pass"`
}

type UpdateUsuario struct {
	User string `json:"user"`
	Name string `json:"name"`
}

// para confirmar
type ConfirmarNuevo struct {
	Mensaje string `json:"mensaje"`
	Status  bool   `json:"status"`
}

// Para ignorar
type IgnorarNuevo struct {
	Mensaje string `json:"mensaje"`
	Error   string `json:"error"`
	Status  bool   `json:"status"`
}

// para el login
type ConfirmarLogin struct {
	Login     bool `json:"login"`
	IdUsuario int  `json:"idUsuario"`
}

var DB *sql.DB

func init() {
	//Leer el archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando archivo .env")
	}

	//Obtener las variables de entorno cargadas
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	//Crear una conexión a la base de datos de Amazon RDS
	DB, err = sql.Open("mysql", connectionString)
	if err != nil {
		fmt.Println("Error al conectar a la base de datos", err)
	} else {
		fmt.Println("Conectado a la base de datos")
	}

}

// Función para insertar un nuevo usuario en la base de datos de Amazon RDS
func InsertarUsuario(c *fiber.Ctx) error {

	//Leeer los datos del usuario
	var usuario Usuario
	if err := c.BodyParser(&usuario); err != nil {
		return err
	}

	//validar que no se repita el nombre de usuario
	count := validacionUsuario(usuario.User)
	if count > 0 {
		var res IgnorarNuevo
		res.Mensaje = "Ya existe el  usuario"
		res.Error = "ya existe"
		res.Status = false
		return c.JSON(res)
	} else {
		//insertar en el S3
		url, err := s3.SaveImagePerfil(c)

		if err != nil {
			fmt.Println("Error al insertar la foto:", err)
			return c.SendString("Error al insertar la foto")
		}
		newpass := md5hash(usuario.Password)
		//Insertar Usuario en la base de datos de Amazon RDS
		_, err = DB.Query("INSERT INTO usuario (username, nombre, pass) VALUES (?, ?, ?)", usuario.User, usuario.Name, newpass)
		if err != nil {
			fmt.Println("Error al insertar el usuario:", err)
			return c.SendString("Error al insertar el usuario")
		}

		//Obtener el id del usuario
		idUser := obtenerUsuario(usuario.User)

		//Insertar la foto de perfil en la base de datos de Amazon RDS
		_, err = DB.Query("INSERT INTO fotoperfin (urlPerfil, activo,idUser) VALUES (?, 1, ?)", url, idUser)
		if err != nil {
			fmt.Println("Error al insertar la foto:", err)
			return c.SendString("Error al insertar la foto")
		}
	}
	var res ConfirmarNuevo
	res.Mensaje = "Insertado exitosamente"
	res.Status = true
	return c.JSON(res)
}

func validacionUsuario(username string) int {

	//Ejecutar una consulta SELECT en la base de datos de Amazon RDS
	result, err := DB.Query("SELECT Count(username) FROM usuario WHERE username = ? ", username)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var count int
	if result.Next() {
		err = result.Scan(&count)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
			return 0
		}
	}

	return count

}

func obtenerUsuario(username string) string {

	//Ejecutar una consulta SELECT en la base de datos de Amazon RDS
	result, err := DB.Query("SELECT idUser FROM usuario WHERE username = ? ", username)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var user string
	if result.Next() {
		err = result.Scan(&user)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
		}
	}

	return user

}

func Login(c *fiber.Ctx) error {
	idUsuarioLogueado = "0"
	// Leer los datos del usuario
	var login UsuarioLogin
	if err := c.BodyParser(&login); err != nil {
		return err
	}
	newpass := md5hash(login.Password)
	existe_usuario := existeUsuario(login.User, newpass)

	if existe_usuario > 0 {
		//Devolver el id del usuario
		idUser := obtenerUsuario(login.User)
		idUsuarioLogueado = idUser
		var res ConfirmarLogin
		res.Login = true
		res.IdUsuario, _ = strconv.Atoi(idUser)
		return c.JSON(res)

	} else {
		//Devolver mensaje de false
		var res ConfirmarLogin
		res.Login = false
		res.IdUsuario = 0
		return c.JSON(res)
	}

}

func existeUsuario(username string, pass string) int {

	//Ejecutar una consulta SELECT en la base de datos de Amazon RDS
	result, err := DB.Query("SELECT COUNT(idUser) FROM usuario WHERE username = ? AND pass = ?", username, pass)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var user int
	if result.Next() {
		err = result.Scan(&user)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
		}
	}

	return user

}

type Inicio struct {
	Username string `json:"username"`
	Nombre   string `json:"nombre"`
	UrlFoto  string `json:"urlFoto"`
}

func PaginaInicio(c *fiber.Ctx) error {
	username, nombre := datosUsuario()
	url := datosFotoPerfil()
	var inicio Inicio
	inicio.Username = username
	inicio.Nombre = nombre
	inicio.UrlFoto = url
	return c.JSON(inicio)
}

func datosUsuario() (string, string) {
	query, err := DB.Query("SELECT username, nombre FROM usuario WHERE idUser = ? ", idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var username string
	var nombre string
	if query.Next() {
		err = query.Scan(&username, &nombre)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
		}
	}

	return username, nombre
}

func datosFotoPerfil() string {
	query, err := DB.Query("SELECT urlPerfil FROM fotoperfin WHERE idUser = ? AND activo = 1", idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var url string
	if query.Next() {
		err = query.Scan(&url)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
		}
	}

	return url
}

type MsjUpdate struct {
	Mensaje bool `json:"dato_actualizado"`
}

func ActualizacionDatos(c *fiber.Ctx) error {
	var usuario UpdateUsuario
	if err := c.BodyParser(&usuario); err != nil {
		return err
	}

	//Actualizar el nombre del usuario
	_, err := DB.Query("UPDATE usuario SET nombre = ?, username = ? WHERE idUser = ?", usuario.Name, usuario.User, idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al actualizar el nombre del usuario:", err)
	}
	var upd MsjUpdate
	upd.Mensaje = true
	return c.JSON(upd)
}

type MsjUpdateFoto struct {
	Mensaje  bool   `json:"actualizado"`
	Locacion string `json:"locacion"`
}

func ActualizarFotoPerfil(c *fiber.Ctx) error {
	//dar de baja la foto de perfil anterior
	_, err := DB.Query("UPDATE fotoperfin SET activo = 0 WHERE activo = 1 AND idUser = ?", idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al actualizar el activo de 1 a 0:", err)
	}

	//Actualizar la foto de perfil
	url, err := s3.UpdateFotoPerfil(c)

	if err != nil {
		fmt.Println("Error al insertar la foto:", err)
		return c.SendString("Error al insertar la foto")
	}

	//Insertar la foto de perfil en la base de datos de Amazon RDS
	_, err = DB.Query("INSERT INTO fotoperfin (urlPerfil, activo,idUser) VALUES (?, 1, ?)", url, idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al insertar la foto:", err)
		return c.SendString("Error al insertar la foto")
	}
	var updfoto MsjUpdateFoto
	updfoto.Mensaje = true
	updfoto.Locacion = url
	return c.JSON(updfoto)
}

type Credencial struct {
	Username string `json:"username"`
	Nombre   string `json:"nombre"`
	Pass     string `json:"pass"`
	UrlFoto  string `json:"urlFoto"`
}

func DatosCredenciales(c *fiber.Ctx) error {
	username, nombre, pass := datosUsuarios()
	res2 := datosFotoPerfils()
	var cred Credencial
	cred.Username = username
	cred.Nombre = nombre
	cred.Pass = pass
	cred.UrlFoto = res2
	return c.JSON(cred)
}

func datosUsuarios() (string, string, string) {
	query, err := DB.Query("SELECT username, nombre, pass FROM usuario WHERE idUser = ? ", idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var username string
	var nombre string
	var pass string
	if query.Next() {
		err = query.Scan(&username, &nombre, &pass)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
		}
	}

	return username, nombre, pass
}

func datosFotoPerfils() string {
	query, err := DB.Query("SELECT urlPerfil FROM fotoperfin WHERE idUser = ? AND activo = 1", idUsuarioLogueado)
	if err != nil {
		fmt.Println("Error al ejecutar la consulta:", err)
	}

	var url string
	if query.Next() {
		err = query.Scan(&url)
		if err != nil {
			fmt.Println("Error al escanear la fila:", err)
		}
	}

	return url
}

func md5hash(password string) string {
	passwordBytes := []byte(password)
	hash := md5.Sum(passwordBytes)
	hashString := fmt.Sprintf("%x", hash)
	return hashString
}
