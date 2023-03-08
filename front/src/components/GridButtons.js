import {Button} from "semantic-ui-react"
import axios from "axios";
import { useNavigate } from "react-router-dom"



function GridButtons() {

    const navigate = useNavigate();
    const url1 = "http://localhost:5000/rds/salirrr";
    const LogOut = (event) => {
        axios.post(url1, {
            Saliste: true
        })
        .then(response => {
            console.log(response.data.SesionCerrada);
            if (response.data.SesionCerrada == true){
                alert("Sesion Cerrada Correctamente");
                sessionStorage.setItem("user",null);
                navigate("/login");
            }else if (response.data.SesionCerrada == false){
                alert("Error desconocido, El programador no sabe que hace usted aqui");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="Dasdboard-grid-buttons">
            <Button content={"Editar Perfil"} icon={"edit"} attached={"bottom"} onClick={()=>{navigate("/editPerfil")}} /><br />
            <Button content={"Subir Foto"} icon={"upload"} attached={"bottom"} onClick={()=>{navigate("/upload")}}/><br />
            <Button content={"Ver fotos"} icon={"search"} attached={"bottom"} onClick={()=>{navigate("/verFoto")}}/><br />
            <Button content={"Editar Albums"} icon={"add user"} attached={"bottom"} onClick={()=>{navigate("/editarAlbums")}}/><br />
            <Button content={"Cerrar Sesion"} icon={"user close"} attached={"bottom"} type="submit" onClick={LogOut} />
        </div>
    )

}

export default GridButtons