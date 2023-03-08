import { React } from "react";
import { Card, Placeholder, Image, Form } from "semantic-ui-react";

function FileInput(props) {

    if (props.ImgUrl == "") {

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{props.title}</Card.Header>
                    <Placeholder>
                        <Placeholder.Image rectangular />
                    </Placeholder>
                    <Card.Description>
                        <Form.Input required type="file" content="Subir Foto" onChange={props.change} accept={".png , .jpg, .jpeg, .pdf"} />
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    } else {
        return (
           
                <Card>
                    <Card.Content>
                        <Card.Header>{props.title}</Card.Header>
                        <Image src={props.ImgUrl} size={"medium"} />
                        <Card.Description>
                            <Form.Input required type="file" content="Subir Foto" onChange={props.change} accept={".png, .jpg, .jpeg"} />
                        </Card.Description>
                    </Card.Content>
                </Card>
          
        )
    }
}

export default FileInput;