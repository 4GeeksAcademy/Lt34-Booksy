import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

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
                <section className="container-fluid d-block vh-100 p-0">
                    <div className="container d-flex flex-column">
                        <div className="row align-items-center justify-content-center gx-0 min-vh-100" >
                            <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11">
                                {/* Heading */}
                                <h1 className="mb-0 fw-bold mt-5">Log in Critic</h1>
                                {/* Text */}
                                <p className="mb-6 text-body-secondary">Give us your best feedback</p>
                                {/* Form */}
                                <form className="mx-auto" onSubmit={sendData}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="name@address.com"
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
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </form>
                            </div>
                            <div className="col-lg-7 offset-lg-1 align-self-stretch d-none d-lg-block derecha">
                                {/* Image */}
                                <div className="h-100 w-cover bg-cover"></div>
                                {/* Shape */}
                                <div className="shape shape-start shape-fluid-y text-white triangle">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default LoginCritico;
