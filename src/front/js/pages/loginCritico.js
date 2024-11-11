import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginCritico = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        if (store.auth) {
            navigate("/");
        }
    }, [store.auth, navigate]);

    function sendData(e) {
        e.preventDefault();
        actions.loginCritico(email, password);
    }

    return (
        <div>
            {store.auth ? (
                <Navigate to='/listaLibrosCritico' /> 
            ) : (
                <div className="row">
                <div className="col-6">
                    <h1 className="text-center">Log in Critico</h1>
                <form className="w-75 mx-auto" onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="example@mail.com"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className="w-100 btn btn-primary mt-4">Login</button>
                </form>
                </div>
                <div className="col-6">
                    <img className="w-100 vh-100" src="https://blog.bmv.com.mx/wp-content/uploads/2020/08/CALIFICADORAS.01.jpg" />
                </div>
                </div>
            )}
        </div>
    );
}

export default LoginCritico;
