import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Divider } from "semantic-ui-react"
import DashboardGrid from "./home"

function DashboadPage() {
    const url = "http://localhost:5000/rds/paginaInicio";
    const [dashData, setDashData] = useState({
        username: "",
        name: "",
        avatar: "",
    });

    useEffect(() => {
        axios.get(url)
        .then(responseData => {
            console.log(responseData);

            setDashData({
                ...dashData,
                ["username"]: responseData.data.username,
                ["name"]: responseData.data.nombre,
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
                    <label>Pagina Principal</label>
                    <Divider />
                </div>
                <DashboardGrid
                    username={dashData.username}
                    name={dashData.name}
                    avatar={dashData.avatar} 
                />
            </div>
        </div>
    )

}

export default DashboadPage