import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const Autor = () => {

    const [nameAutor, setNameAutor] = useState('');

    const { store, actions } = useContext(Context);

    let { idAutor } = useParams()

	const handleSubmitAutor=() =>{
		const editAutor={
			name:nameAutor,
		}
		const result = actions.editAutor(editAutor, idAutor)
		console.log(result)
		
			//navigate("/demo")
	}

    return (
        <div>
            <Navbar />
            <h1 className="w-50 mx-auto m-5">Autor</h1>
            <form className="w-50 mx-auto">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input 
                            value={nameAutor} 
                            onChange={(e) => setNameAutor(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            id="inputName" 
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-primary my-5" onClick={()=>actions.addAutor(nameAutor)}>Add</button>
                {/* En esta instancia del proyecto no necesitamos EDIT / DELETE. Dejo los botones creados y cuando lo necesitemos se terminan de definir */}
                {/* <button type="button" className="btn btn-primary my-5" onClick={()=>actions.editCategory(editCategory, idCategory)}>Edit</button>
                <button className="btn btn-danger" onClick={()=>actions.deleteCategory(idCategory)}> Delete</button> */}
            </form>
            <Link to="/">
                <button className="btn btn-primary">Back Booksy</button>
            </Link>
            <Footer />
        </div>
        
    );
};

export default Autor;