import axios from "axios";
import { useState } from "react";
import { Form, Divider, Button, Grid } from "semantic-ui-react";
import FileInput from "./FileInput";
import { useNavigate } from "react-router-dom";
 
function RegisterForm() {
    let base64 = ''
    const url = "http://localhost:5000/rds/registeUser";
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        password: "",
        image: []
    })
    const [base64Image, setBase64Image] = useState('');
    const [ImgUrl, setImgUrl] = useState("");
    const [rePassword, setRepassword] = useState("");

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    }

    const handleRePasswordChange = (event) =>{
        setRepassword(event.target.value);
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

    const sendData = () => {

        const dataForm = new FormData();
        dataForm.append("username", userData.username);
        dataForm.append("name", userData.name);
        dataForm.append("password", userData.password);
        dataForm.append("image", userData.image[0]);
        if (userData.password == rePassword) {
            axios.post(url, {
                user: userData.username, 
                name: userData.name,
                password: userData.password,
                base64:base64Image.split(',')[1],
                namefoto: userData.image[0].name
            })  
            .then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.mensaje);
                if (response.data.mensaje == 'Insertado exitosamente'){
                    alert("Usuario creado con Exito");
                    navigate("/login");
                }else if (response.data.mensaje == 'Ya existe el usuario'){
                    alert("Ya existe el usuario");
                    navigate("/login");
                }else{
                    alert("Error desconocido, el programador no sabe ni que error hubo, F");
                    navigate("/login");
                }
                
            }).catch(err => {
                console.log(err);
            });
        } else {
            alert("Las contraseñas no coinciden");
        }
    }
    return (
        <div className="Register-Form">

            <div className="Login-Form-Header">
                <div className="Login-Forn-Header-Text">
                    <label> Creación de cuenta</label>
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
                                    onChange={handleInputChange} />
                            </Grid.Row>

                            <Grid.Row>
                                <Form.Input required
                                    type='password'
                                    name='password'
                                    autoComplete="new-password"
                                    label="Contraseña"
                                    labelPosition="left"
                                    size="mini"
                                    onChange={handleInputChange} />
                            </Grid.Row>

                            <Grid.Row>
                                <Form.Input required
                                    type='password'
                                    name='repassword'
                                    autoComplete="new-password"
                                    label="Repetir Contraseña"
                                    labelPosition="left"
                                    size="mini"
                                    onChange={handleRePasswordChange} />
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
                                <Button className="ui black button" type="submit" onClick={sendData}>Crear Cuenta</Button>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Form>

            </div>
        </div>
    )

}

export default RegisterForm