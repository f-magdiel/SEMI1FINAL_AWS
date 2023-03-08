import React from "react";

function CardFoto(props) {
    return (

       <div>
         <div className="card">
            <img src={props.foto} style={{ width: '110px', height: '100px' }} />
        </div>
       </div>

    );
}

export default CardFoto;