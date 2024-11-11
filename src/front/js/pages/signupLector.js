import React, { useState, useContext, useEffect } from "react"; 
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signup.css";

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
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
   

    

    function sendData(e){
        e.preventDefault(); 

     
        actions.addLector(email,password,name,lastname);
    }

    return (
        
        <div className="container-fluid marco d-flex">
            <div className="left w-50">
                <form className="w-75 mx-auto" onSubmit={sendData}>
                    <h1 className="d-block ">Register as a Reader</h1>
                    <div className="row g-3 d-flex flex-column">
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
                            <label htmlFor="inputLastname" className="form-label">Last Name</label>
                            <input 
                                value={lastname} 
                                onChange={(e) => setLastname(e.target.value)} 
                                type="text" 
                                className="form-control" 
                                id="inputLastname" 
                                placeholder="Your Last Name"
                            />
                        </div>
                    </div>
                        <div className="col">
                   
                            <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                className="form-control" 
                                id="exampleInputEmail2" 
                                aria-describedby="emailHelp" 
                                placeholder="email@example.com"
                            />
                      
                        <div className="col">
                            <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                className="form-control" 
                                id="exampleInputPassword2" 
                                placeholder="********"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-100 btn btn-primary my-5 px-2" >Register</button>
                </form>
                <Link to="/">
                    <button className="btn btn-primary p-2">Back Booksy</button>
                </Link>
            </div>
            <div className="right">
            </div>
        </div>
    );
};

export default SignupLector;
