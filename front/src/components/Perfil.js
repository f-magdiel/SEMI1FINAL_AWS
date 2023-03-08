// Aqui se llamar la informacion del usuario para mostrarla en la pantalla principal

import { useEffect, useState } from "react";

import { Card, Image } from "semantic-ui-react"
import matthew from "../images/matthew.png"

function AvatarComponent(props) {
    const [name, setName] = useState("usuario");
    const [imageUrl, setImageUrl] = useState(matthew);
    const [message, setMessage] = useState("welcome, ");

    useEffect(() => {
        if ((props.imageUrl !== null) && (props.imageUrl !== undefined)) {
            setImageUrl(props.imageUrl);
        }

    },[, props.imageUrl])

    return (
        <Image src={imageUrl} size={"medium"} />
    )

}

export default AvatarComponent
