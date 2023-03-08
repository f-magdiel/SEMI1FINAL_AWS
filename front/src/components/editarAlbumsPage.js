import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Divider } from "semantic-ui-react"
import AlbumsGrid from "./editarAlbums"

function DashboadPage() {
   
    const [dashData, setDashData] = useState({
        username: "",
        avatar: "",
    });
    const url = "http://localhost:5000/rds/paginaInicio";
    useEffect(() => {
        axios.get(url)
        .then(responseData => {
            console.log(responseData);

            setDashData({
                ...dashData,
                ["username"]: responseData.data.username,
                ["avatar"]: responseData.data.urlFoto,
            })
        }).catch(err => {
            console.log("ERROR"+err);
        });
        
    }, [])

    return (
        <div className="Dashboard-Page">
            <div className="Dashboard-Page-Body">

                <div className="dashboard-page-body-title">
                    <label>Albums</label>
                    <Divider />
                </div>

                <AlbumsGrid
                    username={dashData.username}
                    avatar={dashData.avatar} />

            </div>
        </div>
    )

}

export default DashboadPage