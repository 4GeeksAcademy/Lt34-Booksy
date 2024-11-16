import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const BookRecommendations = () => {
    const { store, actions } = useContext(Context);

    const handleGetRecommendations = () => {
        actions.getRecommendations();
    };

    
    useEffect(() => {
        handleGetRecommendations();
    }, []); 

    return (
        <>
        <Navbar />
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 bg-light">
            <div className="text-center" style={{ maxWidth: '800px', margin: '20px auto' }}>
                <h1 className="display-4 mb-3 text-primary">Recomendación de Booksy</h1>
                <button 
                    className="btn btn-primary btn-lg shadow-lg mb-3" 
                    onClick={handleGetRecommendations}
                >
                    Obtener Recomendaciones
                </button>
                <div className="mt-3" style={{ minHeight: '100px' }}>
                    {store.loading ? ( 
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    ) : store.recommendations.length > 0 ? (
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            <p className="text-dark">{store.recommendations[0]}</p>
                        </div>
                    ) : (
                        <p className="text-dark">No hay recomendaciones disponibles.</p> 
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default BookRecommendations;
