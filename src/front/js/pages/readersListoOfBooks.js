import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import "../../styles/readersListOfBooks.css";

export const ReadersListOfBooks = () => {
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState("genero"); // Tab inicial

    useEffect(() => {
        actions.getBooks();
    }, []);

    // Función para agrupar libros por género o autor
    const groupBooks = (key) => {
        return store.books.reduce((acc, book) => {
            const groupKey = book[key];
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(book);
            return acc;
        }, {});
    };

    const booksByGenero = groupBooks("genero");
    const booksByAutor = groupBooks("autor");

    // Función para manejar el cambio de estado de favoritos
    const handleFavoriteToggle = (bookId) => {
        actions.toggleFavorite(bookId); // Implementa esta acción en tu store
    };

    return (
        <div className="container">
            <h1 className="m-5">Lista de Libros para Lectores</h1>
            <div className="tabs">
                <button className={`tab ${activeTab === "genero" ? "active" : ""}`} onClick={() => setActiveTab("genero")}>
                    Por Género
                </button>
                <button className={`tab ${activeTab === "autor" ? "active" : ""}`} onClick={() => setActiveTab("autor")}>
                    Por Autor
                </button>
            </div>

            <div className="row">
                {activeTab === "genero" && Object.keys(booksByGenero).map((genero, index) => (
                    <div key={index} className="col-md-6">
                        <h2>{genero}</h2>
                        <div className="row flex-row flex-nowrap" style={{ overflowX: "auto" }}>
                            {booksByGenero[genero].map((book, idx) => (
                                <div key={idx} className="card" style={{ width: '18rem', marginRight: '1rem' }}>
                                    <img
                                        src={book.cover}
                                        alt={book.titulo}
                                        className="card-img-top"
                                        style={{ width: '300px', height: '300px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.titulo}</h5>
                                        <p className="card-text">
                                            <strong>Autor:</strong> {book.autor} <br />
                                            <strong>Cantidad de Páginas:</strong> {book.cantidad_paginas} <br />
                                            <strong>Año Publicado:</strong> {book.year}
                                        </p>
                                        <span 
                                            onClick={() => handleFavoriteToggle(book.id)} 
                                            className="favorite-icon"
                                        >
                                            <FontAwesomeIcon icon={store.favorites.includes(book.id) ? solidHeart : regularHeart} />
                                        </span>
                                        <Link to={`/bookdetails/${book.id}`} className="btn btn-secondary ms-2">Más</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {activeTab === "autor" && Object.keys(booksByAutor).map((autor, index) => (
                    <div key={index} className="col-md-6">
                        <h2>{autor}</h2>
                        <div className="row flex-row flex-nowrap" style={{ overflowX: "auto" }}>
                            {booksByAutor[autor].map((book, idx) => (
                                <div key={idx} className="card" style={{ width: '18rem', marginRight: '1rem' }}>
                                    <img
                                        src={book.cover}
                                        alt={book.titulo}
                                        className="card-img-top"
                                        style={{ width: '300px', height: '300px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.titulo}</h5>
                                        <p className="card-text">
                                            <strong>Género:</strong> {book.genero} <br />
                                            <strong>Cantidad de Páginas:</strong> {book.cantidad_paginas} <br />
                                            <strong>Año Publicado:</strong> {book.year}
                                        </p>
                                        <span 
                                            onClick={() => handleFavoriteToggle(book.id)} 
                                            className="favorite-icon"
                                        >
                                            <FontAwesomeIcon icon={store.favorites.includes(book.id) ? solidHeart : regularHeart} />
                                        </span>
                                        <Link to={`/bookdetails/${book.id}`} className="btn btn-secondary ms-2">Más</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
