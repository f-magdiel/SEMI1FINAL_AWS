import { useState } from "react";
import { Link } from "react-router-dom"
import { Icon, Menu } from "semantic-ui-react"
import { useNavigate } from "react-router-dom";

function HeaderComponent() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
    useState(() => {
        setUserId(window.sessionStorage.getItem("user"));
    }, [userId])

    const handleOnLogOut = (event) => {
        event.preventDefault();
        setUserId(null);
        setTimeout(navigate("/login"), 2000);
    }

    const LoggedHeader = () => {
        return (
            <div className="Header">
                <Menu inverted >
                    <Menu.Item as={Link} to={"/dashboard"}  >
                        <div className="Header-Text">
                            <Icon name="home" />
                            <label> Home </label>
                        </div>
                        
                    </Menu.Item>
                </Menu>
            </div>
        )
    }

    const guestHeader = () => {
        return (
            <div className="Header">
                <Menu inverted>
                    <Menu.Item as={Link} to={"/login"} >
                        <div className="Header-Text">
                            <Icon name="cloud" />
                            <label> PhotoBucket </label>
                        </div>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }



    return (
        <div>
            {sessionStorage.getItem("user")
                ?
                LoggedHeader()
                :
                guestHeader()
            }
        </div>
    )

}

export default HeaderComponent