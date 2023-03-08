import axios from "axios";
import { useState } from "react"
import { Button, Divider, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";


function LoginForm() {

    const navigate = useNavigate();
    const url = "http://localhost:5000/rds/iniciousuario";
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });

        console.log(credentials);
    }

    const verifyCredentials = (event) => {
        axios.post(url, {
            user: credentials.username, 
            pass: credentials.password
        })
        .then(response => {
            console.log(response.data.login);
            if (response.data.login == true){
                sessionStorage.setItem("user", 1111111111);
                alert("Usuario logueado correctamente");
                navigate("/dashboard");
            }else if (response.data.login == false){
                alert("Credenciales incorrectas, por favor revise los datos");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="Login-Form">
            <div className="Login-Form-Header">
                <div className="Login-Forn-Header-Text">
                    <label> Inicio de Sesión</label>
                </div>
                <Divider />
            </div>

            <div className="Login-Form-Body">
                <Form>
                    <Form.Input icon={"user"} /*required*/ autoComplete="username" type='text' name='username' label="Usuario / e-mail" labelPosition="left" placeholder='Enter your username/e-mail' onChange={handleInputChange} />
                    <Form.Input icon={"lock"} /*required*/ autoComplete="current-password" type='password' name='password' label="Contraseña" labelPosition="left" placeholder='Enter your password' onChange={handleInputChange} />
                    <p>¿Nuevo en PhotoBucket? <a href="/Register">Crear una cuenta.</a></p>
                    <div className="Login-Form-Button">
                        <Button className="ui black button" type="submit" onClick={verifyCredentials}>Iniciar Sesion</Button>
                    </div>
                </Form>
            </div>
        </div>

    )





}

export default LoginForm;