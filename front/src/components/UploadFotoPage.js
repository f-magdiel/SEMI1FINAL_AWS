import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Icon } from "semantic-ui-react";
import FileInput from "./FileInput";
import DropdownMenu from "./DropdownMenu";




function UploadPage() {

    const url = "http://localhost:5000/rds/albums";
    const url1 = "http://localhost:5000/rds/NuevaFotoAlbum";
    const [base64Image, setBase64Image] = useState('');
    const [idAlbum, setIdAlbum] = useState('');
    const [selectOptions, setSelectOptions] = useState([])
    const [ImgUrl, setImgUrl] = useState("");
    const [name, setName] = useState("");
    const [userData, setUserData] = useState({
        image: []
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(url)
        .then(response => {
            console.log(response);
            setSelectOptions(response.data);
        }).catch(err => {
            console.log("ERROR"+err);
        });
        
    }, [])

    const handleInputChange = (event) => {
        setName({
            ...name,
            [event.target.name]: event.target.value
        });
        console.log(name)
    }

    const handleFilesChange = (event) => {
        const files = event.target.files;
        if (!event.target.files[0]) {
            console.log("No eligio archivo")
            return;
        }
        if (userData.image.length > 0) {
            userData.image[0] = (event.target.files[0]);
        } else {
            userData.image.push(event.target.files[0]);
        }
        setImgUrl(URL.createObjectURL(event.target.files[0]));
        console.log(event.target.files[0].type);
        const file =  files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64Image(reader.result);
        };
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

    const sendRequest = () => {
        axios.post(url1, {
            idAlbum: idAlbum.idAlbum,
            base64: base64Image.split(',')[1],
            namefoto: name.name + "."+userData.image[0].name.split('.')[1]
        })
        .then(responseData => {
            alert("Archivo subido con exito.")
            navigate("/dashboard");
        }).catch(err => {
            console.log(err);
        });
        
    }
    return (

        <div className="upload-page">

            <div className="upload-page-header">
                <div className="upload-page-header-txt">
                    <label> Subir Archivo </label><Icon name="upload" />
                </div>
                <Divider />
            </div>

            <div className="upload-page-body">
                <div >
                    <Form className="upload-form">
                        <Grid centered >
                            <Grid.Column width={6}>
                                <Grid.Row>
                                    <Form.Input required
                                        type='text'
                                        name='name'
                                        autoComplete="name"
                                        labelPosition="left"
                                        label="Nombre del Archivo"
                                        placeholder="Ingrese el nombre de la nueva foto"
                                        onChange={handleInputChange}
                                    />
                                </Grid.Row>
                                </Grid.Column>
                            <Grid.Column width={8}>
                                <Grid.Row>
                                    <FileInput change={handleFilesChange} ImgUrl={ImgUrl} title={"Preview (solo imagenes)"}></FileInput>
                                </Grid.Row>
                                <Grid.Row>
                                    <DropdownMenu options={selectOptions} change={handleSelectChange} title={"Album"} placeholder={"Seleccionar Album"} />
                                </Grid.Row>
                            </Grid.Column>

                            <Grid.Row centered >
                                <Button negative type="button" onClick={() => { navigate("/dashboard") }}>Cancelar</Button>
                                <Button color="blue" type="submit" onClick={sendRequest}>Subir Foto</Button>
                                <Button negative type="button" onClick={() => { navigate("/editarAlbums") }}>Crear Album</Button>
                            </Grid.Row>
                        </Grid>
                    </Form>

                </div>
            </div>
        </div>
    )

}

export default UploadPage;