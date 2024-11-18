import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const SignupCritico = () => {
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
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [aboutMe, setAboutMe] = useState('');
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
        actions.signupCritico(email, password, name, lastName, gender, aboutMe);
        navigate("/loginCritico");
    }

    return (
        <section className="container-fluid d-block vh-100 p-0">
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center gx-0 min-vh-100"> 
                    <div  className="col-12 col-md-6 col-lg-4 py-8 py-md-11">
                        {/* Heading */}
                        <h1 className="mb-0 fw-bold mt-5">Register as a Critic</h1>
                        {/* Text */}
                        <p className="mb-6 text-body-secondary">Give us your best feedback</p>
                        {/* Form */}
                        <form className="mx-auto" onSubmit={sendData}>
                            {/* Name, LastName and Gender*/}
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="inputName" className="form-label">Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="inputName"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                    <input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="inputLastName"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputGender" className="form-label">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
                            </div>
                            {/* Email and password*/}
                            <div className="form-group">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
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
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">About me</label>
                                    <textarea
                                        value={aboutMe}
                                        onChange={(e) => setAboutMe(e.target.value)}
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            {error && <div className="text-danger my-2">{error}</div>}
                             {/* Submit*/}
                            <button type="submit" className="btn btn-primary my-5">Register</button>
                        </form>
                        {/* <Link to="/">
                            <button className="btn btn-primary">Back Booksy</button>
                        </Link> */}
                        </div>
                        <div className="col-lg-7 offset-lg-1 align-self-stretch d-none d-lg-block">
                            {/* Image */}
                            <div className="h-100 w-cover bg-cover" style={{backgroundImage: `url("https://landkit.goodthemes.co/assets/img/covers/cover-14.jpg")`}}></div>
                            {/* Shape */}
                            <div className="shape shape-start shape-fluid-y text-white">
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h100v386l-50 772v386H0V0z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

            </div>
        </section>
    );
};

export default SignupCritico;
