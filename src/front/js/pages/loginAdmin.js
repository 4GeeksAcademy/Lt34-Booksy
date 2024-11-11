import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);

    function sendData(e) {
        e.preventDefault();
        actions.loginAdmin(email, password);
    }

    return (
        <div>
            {store.auth ? (
                <Navigate to='/addbook' /> 
            ) : (
                <div className="row marcolog">
                    <div className="col-6">
                            <h1 className="text-center">Log in Admin</h1>
                        <form className="w-75 m-auto vh-100" onSubmit={sendData}>
                            <div className="d-block">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                                <input 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="example@mail.com"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword"
                                    placeholder="********"
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-100 btn btn-primary mt-4">Login</button>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-6 right">
                        <img className="w-100 vh-100" src="https://miwebenterrassa.com/wp-content/uploads/2024/11/blog-servidores.webp"/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginAdmin;