var saveImagePerfil = async (req, res) => {
  var id = req.body.id
  var foto = req.body.foto
  //carpeta y nombre que quieran darle a la imagen
  var cadena = 'Fotos_Perfil/' + id + '.jpg' // fotos -> se llama la carpeta UBICACION
  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64')

  AWS.config.update({
    region: 'us-east-2', // se coloca la region del bucket
    accessKeyId: '',
    secretAccessKey: '',
  })

  var s3 = new AWS.S3() // se crea una variable que pueda tener acceso a las caracteristicas de S3

  const params = {
    Bucket: 'practica1-g3-imagenes', // nombre
    Key: cadena, // Nombre de ubicacion
    Body: buff, // Imagen enn bytes
    ContentType: 'image', // tipo de contenido
  }
  const putResult = s3.putObject(params).promise()
  res.json({ mensaje: putResult, status: true })
}

var saveImagePublicada = async (req, res) => {
    var id = req.body.id
    var foto = req.body.foto
    //carpeta y nombre que quieran darle a la imagen
    var cadena = 'Fotos_Publicadas/' + id + '.jpg' // fotos -> se llama la carpeta UBICACION
    //se convierte la base64 a bytes
    let buff = new Buffer.from(foto, 'base64')
  
    AWS.config.update({
      region: 'us-east-2', // se coloca la region del bucket
      accessKeyId: '',
      secretAccessKey: '',
    })
  
    var s3 = new AWS.S3() // se crea una variable que pueda tener acceso a las caracteristicas de S3
  
    const params = {
      Bucket: 'practica1-g3-imagenes', // nombre
      Key: cadena, // Nombre de ubicacion
      Body: buff, // Imagen enn bytes
      ContentType: 'image', // tipo de contenido
    }
    const putResult = s3.putObject(params).promise()
    res.json({ mensaje: putResult, status: true })
  }
  
var getImagePerfil = async (req, res) => {
  var id = req.body.id
  var cadena = 'Fotos_Perfil/' + id + '.jpg' // fotos -> se llama la carpeta UBICACION

  AWS.config.update({
    region: 'us-east-2', // se coloca la region del bucket
    accessKeyId: '',
    secretAccessKey: '',
  })

  var S3 = new AWS.S3()

  var getParams = {
    Bucket: 'practica1-g3-imagenes',
    Key: cadena,
  }

  S3.getObject(getParams, function (err, data) {
    if (err) {
      res.json(err)
    } else {
      var dataBase64 = Buffer.from(data.Body).toString('base64') //resgresar de byte a base
      res.json({ mensaje: dataBase64 })
    }
  })
}

var getImagePublicada = async (req, res) => {
  var id = req.body.id
  var cadena = 'Fotos_Publicadas/' + id + '.jpg' // fotos -> se llama la carpeta UBICACION

  AWS.config.update({
    region: 'us-east-2', // se coloca la region del bucket
    accessKeyId: '',
    secretAccessKey: '',
  })

  var S3 = new AWS.S3()

  var getParams = {
    Bucket: 'practica1-g3-imagenes',
    Key: cadena,
  }

  S3.getObject(getParams, function (err, data) {
    if (err) {
      res.json(err)
    } else {
      var dataBase64 = Buffer.from(data.Body).toString('base64') //resgresar de byte a base
      res.json({ mensaje: dataBase64 })
    }
  })
}
  
module.exports = {
  saveImagePublicada,
  saveImagePerfil,
  getImagePerfil,
  getImagePublicada,
}
  