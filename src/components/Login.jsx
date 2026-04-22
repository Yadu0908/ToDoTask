import { useState } from "react";
import "../App.css"
import { Navigate, useNavigate } from "react-router-dom";

function Login({setIsAuthenticate }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const nagivate = useNavigate();

    function handleLogin (e){
        e.preventDefault();

        if(username.trim () === "admin" && password.trim() === "pswd"){

            localStorage.setItem("isLoggedIn", "true")
            setIsAuthenticate(true)
            nagivate("/todo");
        }

        else{

            alert("Please enter correct password")
        }
    }

    return (

        <>

            <div className="login-page-wrapper">


                <div className="login-container">
                <h1>Login page</h1>

                    <form action="" method="post" className="login-form" onSubmit={handleLogin}>

                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="submit-button" >Submit</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login