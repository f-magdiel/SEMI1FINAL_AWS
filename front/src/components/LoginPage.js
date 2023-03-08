import LoginForm from "./LoginForm";

function LoginPage() {
    console.log(process.env)
    return (

        <div className="Login-Page">
            <div className="Login-Page-Body">
                <LoginForm></LoginForm>
            </div>
        </div>
    )

}

export default LoginPage;