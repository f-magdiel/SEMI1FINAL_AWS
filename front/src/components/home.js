import { React, useState, useEffect } from "react"
import { Grid, Header, Icon } from "semantic-ui-react";
import AvatarComponent from "./Perfil"
import GridButtons from "./GridButtons";

function DashboardGrid(props) {

    
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        setUsername(props.username);
        setName(props.name);
        setAvatar(props.avatar);
    }, [props.username, props.name, props.avatar])
    return (
        <div className="Dashboard-Grid">
            <Grid celled >
                <Grid.Column width={4} textAlign = 'center' verticalAlign='middle'>
                    <AvatarComponent imageUrl={avatar}/>
                </Grid.Column>
                <Grid.Column width={8} textAlign = 'center' verticalAlign='middle'>
                    <Header as='h1'><Icon name='id card' />Nombre Completo:</Header>
                    <Header as='h2'>{name}</Header>
                    <Header as='h1'><Icon name='user' />User Name:</Header>
                    <Header as='h2'>{username}</Header>
                </Grid.Column>
                <Grid.Column width={4} textAlign = 'center' verticalAlign='middle'>
                    <GridButtons></GridButtons>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default DashboardGrid;