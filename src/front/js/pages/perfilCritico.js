import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const ProfileCritico = () => {
    const { store, actions } = useContext(Context);
    const [critic, setCritic] = useState([]);                  

    const handleImageUpload = async (e) => {
        const files = e.target.files;
      
        if (files.length > 0) {
            try {
                await actions.uploadImage(files);
                await updateCritico(store.imageUrl); 
            } catch (error) {
                console.error("Error al manejar la carga de la imagen:", error);
            }
        }
    };

    const updateCritico = async (imageUrl) => {
        const body = {
            nombre: critic.nombre,
            apellido: critic.apellido,
            genero: critic.genero,
            acerca_de_mi: critic.acerca_de_mi,
            email: critic.email,
            images: imageUrl 
        };
        
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/critico/${critic.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el crítico");
            }

            const responseData = await response.json();
            console.log("Crítico actualizado:", responseData);
          
        } catch (error) {
            console.error("Error al actualizar crítico:", error);
        }
    };

    useEffect(() => {
        const fetchCritico = async () => {
            await actions.getCritico();
        };
        fetchCritico();
    }, []);

    useEffect(() => {
        setCritic(store.critico);
    }, [store.critico]); 
 

    return (
        <>
        <Navbar />
        <div className="container">
            <h1 className="my-5">Critic Profile</h1>
            <div>
                <h1>Upload Profile Image</h1>
                <input type="file" onChange={(e)=>handleImageUpload(e)} />
                
                <img src={critic.images} alt="Uploaded" style={{ width: "150px", height: "auto" }} />
                
            </div>
            
            {critic ? (
                <div className="card my-5">
                    <div className="card-body">
                        <h5 className="card-title">{critic.nombre} {critic.apellido}</h5>
                        <p className="card-text"><strong>Email:</strong> {critic.email}</p>
                        <p className="card-text"><strong>Gender:</strong> {critic.genero}</p>
                        <p className="card-text"><strong>About Me:</strong> {critic.acerca_de_mi}</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <Link to="/listaLibrosCritico">
                <span className="btn btn-primary btn-lg" role="button">
                    Back to list
                </span>
            </Link>
        </div>
        <Footer />
        </>
    );
};

export default ProfileCritico;

