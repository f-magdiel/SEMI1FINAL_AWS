import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Divider, Button, Grid } from "semantic-ui-react";
import FileInput from "./FileInput";
import { useNavigate } from "react-router-dom";
const CryptoJS = require('crypto-js');


function EditarPerfilPage() {

    function encryptPassword(password) {
        return CryptoJS.MD5(password).toString();
    }
    const url1 = "http://localhost:5000/rds/PAA";
    const url2 = "http://localhost:5000/rds/ActualizarDatosPerfil";
    const url3 = "http://localhost:5000/rds/ActualizarFotoPerfil";
    const [dashData, setDashData] = useState({
        username: "",
        name: "",
        pass: "",
        avatar: "",
    });
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        password: "",
        image: []
    });
    const [base64Image, setBase64Image] = useState('');
    const [ImgUrl, setImgUrl] = useState("");

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    }

    const handleFilesChange = (event) => {
        const files = event.target.files;
        if(!event.target.files[0]){
            return;
        }
        
        if (userData.image.length > 0) {
            userData.image[0] = (event.target.files[0]);
        } else {
            userData.image.push(event.target.files[0]);
        }
        setImgUrl(URL.createObjectURL(event.target.files[0]));
        const file =  files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64Image(reader.result);
        };
    }

    const navigate = useNavigate();   

    useEffect(() => {
        axios.get(url1)
        .then(responseData => {
            console.log(responseData);
            setDashData({
                ...dashData,
                ["username"]: responseData.data.username,
                ["name"]: responseData.data.nombre,
                ["pass"]: responseData.data.pass,
                ["avatar"]: responseData.data.urlFoto,
            })
            setUserData({
                ...userData,
                ["username"]: responseData.data.username,
                ["name"]: responseData.data.nombre,
                ["image"]: [],
            });
        }).catch(err => {
            console.log("ERROR"+err);
        });
    }, [])
    const sendData = () => {
        const newpass = encryptPassword(userData.password);
        if (newpass === dashData.pass) {
            axios.post(url2, {
                user: userData.username, 
                name: userData.name
            })
            .then(response => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.dato_actualizado);
                if (response.data.dato_actualizado == true){
                    alert("Usuario Actualizado con Exito");
                    navigate("/dashboard");
                }
                
            }).catch(err => {
                console.log(err);
            });
        } else {
            alert("Las contraseñas no coinciden");
        }
    }

    const sendData1 = () => {
        const newpass = encryptPassword(userData.password);
        console.log(userData)
        const dataForm = new FormData();
        dataForm.append("username", userData.username);
        dataForm.append("name", userData.name);
        dataForm.append("password", userData.password);
        dataForm.append("image", userData.image[0]);
        if (newpass === dashData.pass) {
            axios.post(url3, {
                base64:base64Image.split(',')[1],
                namefoto: userData.image[0].name
            })
            .then(response => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.actualizado);
                if (response.data.actualizado == true){
                    console.log(response.data.locacion)
                    alert("Foto Actualizada con Exito");
                    navigate("/dashboard");
                }
                
            }).catch(err => {
                console.log(err);
            });
        } else {
            alert("Las contraseñas no coinciden");
        }
    }

    const sendData2 = () => {
        navigate("/dashboard");      
    }

    return (
        <div className="Register-Form">
            <div className="Login-Form-Header">
                <div className="Login-Forn-Header-Text">
                    <label> Modificar Datos</label>
                </div>
                <Divider />
            </div>
            <div className="Register-Form-Body">
                <Form >
                    <Grid>
                        <Grid.Column width={7}>
                            <Grid.Row>
                                <Form.Input required
                                    size="mini"
                                    type='text'
                                    name='username'
                                    label="Username"
                                    labelPosition="left"
                                    autoComplete="username"
                                    value= {userData.username}
                                    onChange={handleInputChange} />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input required
                                    size="mini"
                                    type='text'
                                    name='name'
                                    label="Nombre"
                                    labelPosition="left"
                                    autoComplete="name"
                                    value= {userData.name}
                                    onChange={handleInputChange} />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input required
                                    type='password'
                                    name='password'
                                    autoComplete="new-password"
                                    label="Confirmar Contraseña"
                                    labelPosition="left"
                                    size="mini"
                                    value= {userData.password}
                                    onChange={handleInputChange} />
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={8} >
                            <Grid.Row>
                                <FileInput change={handleFilesChange} ImgUrl={ImgUrl} title={"Foto de Perfil"}></FileInput>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Row centered>
                            <div className="Register-Form-Button">
                                <Button className="ui black button" type="submit" onClick={sendData}>Modificar Datos</Button>
                                <Button className="ui black button" type="submit" onClick={sendData1}>Modificar Foto</Button>
                            </div>
                            
                        </Grid.Row>
                    </Grid>
                </Form>

            </div>
        </div>
    )

}

export default EditarPerfilPage