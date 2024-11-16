import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/wishlistLector.css"; 
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const WishlistLector = () => {
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
            <h1 className="mt-5">Lista de Deseos del Lector</h1>
            {store.books.length === 0 ? (
                <p>Cargando libros...</p> 
            ) : store.wishlist.length === 0 ? (
                <p>No hay libros en tu lista de deseos.</p>
            ) : (
                <div className="row">
                    {store.wishlist.map((wishlistId) => {
                        const wishlistBook = store.books.find(book => book.id === wishlistId);
                        if (!wishlistBook) return null; 

                        return (
                            <div key={wishlistId} className="col-md-3 mb-4"> 
                                <div className="card" style={{ height: '365px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <img
                                        src={wishlistBook.cover}
                                        alt={wishlistBook.titulo}
                                        className="card-img-top"
                                        style={{ maxHeight: '200px', width: '100%', objectFit: 'contain', margin: 'auto' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ marginBottom: '5px', height: '30px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {truncateTitle(wishlistBook.titulo, 40)}
                                        </h5> 
                                        <p className="card-text" style={{ marginTop: '10px', height: '30px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <strong>Autor:</strong> {truncateTitle(wishlistBook.autor, 40)}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/bookdetails/${wishlistBook.id}`} className="btn btn-primary">Ver Detalles</Link>
                                            <button 
                                                className="btn btn-danger ml-2" 
                                                onClick={() => actions.toggleWishlist(wishlistBook.id)} 
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
