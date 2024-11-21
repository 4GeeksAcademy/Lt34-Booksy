import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";

export const LoginLector = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const loginData = await actions.loginLector(email, password);

        if (loginData) {
            navigate("/readersListOfBooks");
        } else {
            setError("Email o contraseña incorrectos");
        }
    };

    useEffect(() => {
        
        if (store.auth) {
            navigate("/readersListOfBooks");
        }
    }, [store.auth, navigate]);

    return (
        <>
           <section className="container-fluid d-block vh-100 p-0">
                <div className="container d-flex flex-column">
                    <div className="row align-items-center justify-content-center gx-0 min-vh-100" >
                        <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11">
                            {/* Heading */}
                            <h1 className="mb-0 fw-bold mt-5">Log in Lectores</h1>
                            {/* Text */}
                            <p className="mb-6 text-body-secondary">Became part of a great community</p>
                            {/* Form */} 
                            <form className="mx-auto" onSubmit={handleSubmit}>

                                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        aria-label="Email"
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="name@address.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        aria-label="Password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your Password"
                                        title="Minimum 6 characters at least 1 Alphabet, 1 Number and 1 Symbol"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <input type="submit" className="my-form__button" value="Login" /> */}
                                <button type="submit" className="btn btn-primary w-100 mb-3 mt-3">Login</button>
                                <div className="my-form__actions">
                                    <div className="my-form__signup">
                                        <Link to="/signupLector" title="Create Account">Eres nuevo? Crea una cuenta</Link>
                                    </div>
                                </div>
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
        </>
    );
};
