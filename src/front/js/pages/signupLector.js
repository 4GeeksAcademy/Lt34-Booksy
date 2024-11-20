import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { relative } from "@cloudinary/url-gen/qualifiers/flag";
import "../../styles/signupLector.css";

const SignupLector = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.auth) {
            navigate("/");
        }
    }, [store.auth, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');

    const isPasswordValid = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
    };

    function sendData(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!isPasswordValid(password)) {
            setError("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.");
            return;
        }

        setError('');
        actions.addLector(email, password, name, lastname);
        navigate("/loginLector");
    }

    return (
    <section className="container-fluid d-block vh-100 p-0">
        <div className="container d-flex flex-column">
            <div className="row align-items-center justify-content-center gx-0 min-vh-100">
                <div className="col-12 col-md-6 col-lg-4 py-8 py-md-11">
                    {/* Heading */}
                    <h1 className="mb-0 fw-bold">Register as a Reader</h1>
                    {/* Text */}
                    <p className="mb-6 text-body-secondary">Became part of a great community</p>
                    {/* Form */}
                    <form className="mb-6" onSubmit={sendData}>
                        {/* Name and LastName*/}
                        <div className="form-group">
                            <div className="col">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Enter your Name"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="inputLastname" className="form-label">Last Name</label>
                                <input
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="inputLastname"
                                    placeholder="Enter your Last Name"
                                />
                            </div>
                        </div>
                        {/* Email*/}
                        <div className="form-group">
                            <div className="col">
                                <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail2"
                                    aria-describedby="emailHelp"
                                    placeholder="name@address.com"
                                />
                            </div>
                        </div>
                        {/* Password*/}
                        <div className="form-group mb-5">
                            <div className="col">
                                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword2"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                    />
                                </div>
                        </div>
                        {error && <div className="text-danger my-2">{error}</div>}
                          {/* Submit*/}
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                    {/* <Link to="/">
                        <button className="btn btn-primary p-2">Back Booksy</button>
                    </Link> */}
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
    );
};

export default SignupLector;
