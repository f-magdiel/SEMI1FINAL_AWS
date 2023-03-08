import { React, useState, useEffect } from "react"
import { Grid, Segment, Header, Form, Button, ButtonGroup } from "semantic-ui-react";
import AvatarComponent from "./Perfil"
import { useNavigate } from "react-router-dom";
import GridButtons from "./GridButtons";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";

function AlbumsGrid(props) {
    const url = "http://localhost:5000/rds/albums";
    const url1 = "http://localhost:5000/rds/NuevoAlbum";
    const url2 = "http://localhost:5000/rds/ModificarAlbum";
    const url3 = "http://localhost:5000/rds/EliminarAlbum";
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [name1, setName1] = useState("");
    const [selectOptions, setSelectOptions] = useState([])
    const [selectOptions1, setSelectOptions1] = useState([])
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [idAlbum, setIdAlbum] = useState('');
    const [idAlbum1, setIdAlbum1] = useState('');

    useEffect(() => {
        setUsername(props.username);
        setAvatar(props.avatar);
        axios.get(url)
        .then(response => {
            setSelectOptions(response.data);
            setSelectOptions1(response.data);
        }).catch(err => {
            console.log("ERROR"+err);
        });

    }, [props.username, props.avatar])

    const handleInputChange = (event) => {
        setName1({
            ...name1,
            [event.target.name]: event.target.value
        });
        console.log(name1)
    }

    const handleInputChange1 = (event) => {
        setName({
            ...name,
            [event.target.name]: event.target.value
        });
    }

    const handleSelectChange = (event) => {
        let choice = event.target.value;
        if (choice === "") { return }
        let arr = choice.split("$");
        setIdAlbum({
            ...idAlbum,
            ["idAlbum"]: arr[0]
        });
    }
    const handleSelectChange1 = (event) => {
        let choice = event.target.value;
        if (choice === "") { return }
        let arr = choice.split("$");
        setIdAlbum1({
            ...idAlbum1,
            ["idAlbum1"]: arr[0]
        });
    }
    const sendData = () => {
        console.log(name)
        console.log(name.newAlbum)
        axios.post(url1, {
            name: name.newAlbum
        })  
        .then((response) => {
            alert("Album Creado Con Exito");
            navigate("/dashboard");
        }).catch(err => {
            console.log(err);
        });
    }

    const sendData1 = () => {
        axios.post(url2, {
            idAlbum: idAlbum.idAlbum,
            name: name1.newName
        })  
        .then((response) => {
            alert("Album Modificado Con Exito");
            navigate("/dashboard");
        }).catch(err => {
            console.log(err);
        });
    }

    const sendData2 = () => {
        axios.post(url3, {
            idAlbum: idAlbum1.idAlbum1
        })  
        .then((response) => {
            alert("Album Eliminado Con Exito");
            navigate("/dashboard");
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="Dashboard-Grid">
            <Grid celled>
                <Grid.Column width={3} textAlign = 'center' verticalAlign='middle'>
                    <AvatarComponent name={username} imageUrl={avatar}/>
                    <br></br>
                    <div className="Login-Form-Button">
                        <ButtonGroup>
                            <Button className="ui black button"  type="submit" onClick={() => { navigate("/dashboard") }} >Mi Perfil</Button>
                            <Button className="ui black button" type="submit" onClick={() => { navigate("/verFoto") }}>Ver fotos</Button>
                        </ButtonGroup>
                    </div>    
                </Grid.Column>
                <Grid.Column width={7}>
                    <Grid.Row>
                        <Header as='h4'>AGREGAR NUEVO ALBUM</Header>
                        <Form >
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                            <Form.Input required
                                                size="mini"
                                                type='text'
                                                name='newAlbum'
                                                label="Nombre Album Nuevo"
                                                autoComplete="name"
                                                labelPosition="left"
                                                onChange={handleInputChange1} />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <div className="Register-Form-Button">
                                            <Button className="ui black button" type="submit" onClick={sendData} >Registrar nuevo Album</Button>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Grid.Row>
                    <Grid.Row>
                        <br></br>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h4'>EDITAR NOMBRE ALBUM</Header>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>                                                             
                                    <DropdownMenu 
                                    options={selectOptions} change={handleSelectChange} 
                                    title={"Album"} placeholder={"Seleccionar Album"} 
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <div className="Register-Form-Button">
                                        <Button className="ui black button" type="submit" onClick={sendData1} >Modificar Nombre Album</Button>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Form.Input required
                                        size="mini"
                                        type='text'
                                        name='newName'
                                        label="Nuevo Nombre: "
                                        autoComplete="newname"
                                        labelPosition="left"
                                        onChange={handleInputChange} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={5}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    <Grid.Row>
                        <Header as='h4'>ELIMINAR ALBUM</Header>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>                                                             
                                    <DropdownMenu options={selectOptions1} 
                                    change={handleSelectChange1} title={"Album"}
                                    placeholder={"Seleccionar Album"} 
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <div className="Register-Form-Button">
                                        <Button className="ui black button"  type="submit" onClick={sendData2} >Eliminar Album</Button>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default AlbumsGrid;