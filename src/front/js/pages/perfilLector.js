import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const ProfileLector = () => {
    const { store, actions } = useContext(Context);
    const [lector, setLector] = useState({});  

    const handleImageUpload = async (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            try {
                
                await actions.uploadImage(files);
             
                await updateLector(store.imageUrl);
            } catch (error) {
                console.error("Error al manejar la carga de la imagen:", error);
            }
        }
    };

    const updateLector = async (imageUrl) => {
        const body = {
            nombre: lector.name,         
            apellido: lector.lastname,
            email: lector.email,
            images: imageUrl              
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/lector/${lector.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el lector");
            }

            const responseData = await response.json();
            console.log("Lector actualizado:", responseData);
        } catch (error) {
            console.error("Error al actualizar lector:", error);
        }
    };

    useEffect(() => {
        const fetchLector = async () => {
            await actions.getLector();
        };
        fetchLector();
    }, []);

    useEffect(() => {
        setLector(store.lector);
        console.log(store.lector)
    }, [store.lector]); 

    return (
        <>
        <Navbar />
        <div className="container">
            <h1 className="my-5">Lector Profile</h1>
            <div>
                <h1>Upload Profile Image</h1>
                <input type="file" onChange={handleImageUpload} />
                <img src={lector.images} alt="Uploaded" style={{ width: "150px", height: "auto" }} />
                
            </div>
            
            {lector ? (
                <div className="card my-5">
                    <div className="card-body">
                        <h5 className="card-title">{lector.name} {lector.lastname}</h5>
                        <p className="card-text"><strong>Email:</strong> {lector.email}</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <Link to="/readersListOfBooks">
                <button className="btn btn-primary my-5">Back to Booksy</button>
            </Link>
        </div>
        <Footer />
        </>
    );
};

export default ProfileLector;
