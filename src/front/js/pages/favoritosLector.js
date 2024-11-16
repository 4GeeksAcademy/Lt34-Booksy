import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/favoritosLector.css"; 
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const FavoritosLector = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        
        actions.getBooks(); 
    }, [actions]); 

    const truncateTitle = (title, maxLength) => {
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    };

    return (
        <>
        <Navbar />
        <div className="container">
            <h1 className="mt-5">Favoritos del Lector</h1>
            {store.books.length === 0 ? (
                <p>Cargando libros...</p> 
            ) : store.favorites.length === 0 ? (
                <p>No hay libros en tus favoritos.</p>
            ) : (
                <div className="row">
                    {store.favorites.map((favoriteId) => {
                        const favoriteBook = store.books.find(book => book.id === favoriteId);
                        if (!favoriteBook) return null;

                        return (
                            <div key={favoriteId} className="col-md-3 mb-4"> 
                                <div className="card" style={{ height: '365px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <img
                                        src={favoriteBook.cover}
                                        alt={favoriteBook.titulo}
                                        className="card-img-top"
                                        style={{ maxHeight: '200px', width: '100%', objectFit: 'contain', margin: 'auto' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ marginBottom: '5px', height: '30px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{truncateTitle(favoriteBook.titulo, 40)}</h5> 
                                        <p className="card-text" style={{ marginTop: '10px', height: '30px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <strong>Autor:</strong> {truncateTitle(favoriteBook.autor, 20)}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/bookdetails/${favoriteBook.id}`} className="btn btn-primary">Ver Detalles</Link>
                                            <button 
                                                className="btn btn-danger ml-2" 
                                                onClick={() => actions.toggleFavorite(favoriteBook.id)} 
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        <Footer />
        </>
    );
};
