package s3

import (
	"bytes"
	"encoding/base64"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gofiber/fiber/v2"
)

// para el registro de usuarios
type Usuario struct {
	User     string `json:"user"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Base64   string `json:"base64"`
	NameFoto string `json:"namefoto"`
}

type FotoPerfil struct {
	Foto   string `json:"namefoto"`
	Base64 string `json:"base64"`
}

func SaveImagePerfil(c *fiber.Ctx) (string, error) {
	//Leeer los datos del usuario
	var usuario Usuario
	if err := c.BodyParser(&usuario); err != nil {
		return "", err
	}

	//Obtener la imagen en base64
	imageData := usuario.Base64
	decodedImage, err := base64.StdEncoding.DecodeString(imageData)
	if err != nil {
		return "", err
	}

	//Convertir la imagen a bytes
	imageReader := bytes.NewReader(decodedImage)

	//Crear una sesión de AWS
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		Config: aws.Config{
			Region:      aws.String("us-east-2"),
			Credentials: credentials.NewStaticCredentials("AKIAQRS3QCIBTQGMI6GV", "LlZfEWGaqGIzPE23/lngklV27Y2iVvvzCNSLSr7S", ""),
		},
	}))

	//Crear un servicio de S3
	svc := s3.New(sess)

	//Subir la imagen a S3
	bucketName := "practica1-g3-imagenes"
	imageName := "Fotos_Perfil/" + usuario.NameFoto + ".jpg"
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(imageName),
		Body:   imageReader,
	})
	if err != nil {
		return "", err
	}
	//Obtener la URL de la imagen
	url := fmt.Sprintf("https://practica1-g3-imagenes.s3.us-east-2.amazonaws.com" + "/" + imageName)
	return url, nil
}

func UpdateFotoPerfil(c *fiber.Ctx) (string, error) {
	//Leeer los datos del usuario
	var foto FotoPerfil
	if err := c.BodyParser(&foto); err != nil {
		return "", err
	}

	//Obtener la imagen en base64
	imageData := foto.Base64
	decodedImage, err := base64.StdEncoding.DecodeString(imageData)
	if err != nil {
		return "", err
	}

	//Convertir la imagen a bytes
	imageReader := bytes.NewReader(decodedImage)

	//Crear una sesión de AWS
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		Config: aws.Config{
			Region:      aws.String("us-east-2"),
			Credentials: credentials.NewStaticCredentials("AKIAQRS3QCIBTQGMI6GV", "LlZfEWGaqGIzPE23/lngklV27Y2iVvvzCNSLSr7S", ""),
		},
	}))

	//Crear un servicio de S3
	svc := s3.New(sess)

	//Subir la imagen a S3
	bucketName := "practica1-g3-imagenes"
	imageName := "Fotos_Perfil/" + foto.Foto + ".jpg"
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(imageName),
		Body:   imageReader,
	})
	if err != nil {
		return "", err
	}
	//Obtener la URL de la imagen
	url := fmt.Sprintf("https://practica1-g3-imagenes.s3.us-east-2.amazonaws.com" + "/" + imageName)
	return url, nil
}
