import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signupCritico.css";

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
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    

    function sendData(e){
        e.preventDefault(); 

     
        actions.signupCritico(email,password,name,lastName,gender,aboutMe);
    }

    return (
        <div className="row marco">
            <div className="col-6">
            <h1 className="w-50 mx-auto m-5">Register as a Critic</h1>
            <form className="w-75 mx-auto" onSubmit={sendData}>
                <div className="row g-3 d-block">
                    <div className="col">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            id="inputName" 
                            placeholder="Your Name"
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
                            placeholder="Your Last Name"
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
                <div className="row g-3 d-block">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="email@example.com"
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
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-1">
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
                
                <button type="submit" className="w-100 btn btn-primary my-5">Register</button>
            </form>
            <Link to="/">
                <button className="btn btn-primary">Back Booksy</button>
            </Link>
            </div>
            <div className="col-6"></div>
        </div>
    );
};

export default SignupCritico;
