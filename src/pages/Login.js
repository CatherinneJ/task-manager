import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if(!username.trim()){
            alert("Your name");
            return
        }

        const user = {
            username,
            role: "user",
        };

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/profile");
    };

    return (
        <div className="login-cont">
            <h2 className="login-si">Sing in or create account</h2>
             <form className="login-form" onSubmit={handleLogin}>
                <input type="text" placeholder="Your name" value={username} onChange={(e)=> setUsername(e.target.value)}
            required></input>
             <select className="login-sel" value={role} onChange={(e) =>setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
             </select>            
            <button  className="login-btn" type="submit">Sing in</button>
             </form>
        </div>
    );
};

export default Login;