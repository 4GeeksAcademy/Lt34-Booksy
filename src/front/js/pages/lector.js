import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const Lector = () => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    

    const { store, actions } = useContext(Context);

    let { idLector } = useParams()

	const handleSubmitLector=() =>{
		const editLector={
			name:name,
            lastname:lastName,
            password:password,
			email:email,
			
		}
		const result = actions.editLector(name,lastName,password,email)
		console.log(result)
		
			//navigate("/demo")
	}

    return (
        <div>
            <Navbar />
            <h1 className="w-50 mx-auto m-5">Edit Reader</h1>
            <form className="w-50 mx-auto">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            id="inputName" 
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            id="inputLastName" 
                        />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail2" 
                            aria-describedby="emailHelp" 
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword2" 
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-primary my-5" onClick={()=>handleSubmitLector()}>Save changes</button>
                <button className="btn btn-danger" onClick={()=>actions.deleteLector(idLector)}> Delete</button>
            </form>
            <Link to="/">
                <button className="btn btn-primary">Back Booksy</button>
            </Link>
            <Footer />
        </div>
    );
};

export default Lector;