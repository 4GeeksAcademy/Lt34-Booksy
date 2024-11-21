import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/signup.css";

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Nuevo estado para manejar errores
    const { store, actions } = useContext(Context);

    function sendData(e) {
        e.preventDefault();
        
        // Restablecer el error antes de intentar el login
        setError('');

        actions.loginAdmin(email, password)
            .then(() => {
                // Si el login es exitoso, el store se actualiza y redirige automáticamente
            })
            .catch((errorMessage) => {
                // Si ocurre un error, se muestra un mensaje de error
                setError(errorMessage);
            });
    }

    return (
        <div>
            {store.auth ? (
                <Navigate to='/addbook' /> 
            ) : (
                <section className="container-fluid d-block vh-100 p-0">
                <div className="container d-flex flex-column">
                    <div className="row align-items-center justify-content-center gx-0 min-vh-100" >
                        <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11">
                            {/* Heading */}
                            <h1 className="mb-0 fw-bold mt-5">Log in Admin</h1>
                            {/* Text */}
                            <p className="mb-6 text-body-secondary">Create a unique online experience for your visitors</p>
                            {/* Form */}
                            <form className="mx-auto" onSubmit={sendData}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="name@address.com"
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
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}  {/* Mostrar el mensaje de error */}
                                <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
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

export default LoginAdmin;
