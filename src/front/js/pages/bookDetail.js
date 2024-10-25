import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/bookDetail.css";

export const BookDetail = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [book, setBook] = useState(null);

    useEffect(() => {
        const foundBook = store.books.find((b) => b.id === parseInt(id));
        setBook(foundBook);
    }, [id, store.books]);

    const handleAddToFavorites = () => {
        if (book) {
            actions.toggleFavorite(book.id);
        }
    };

    if (!book) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="book-detail-container">
            <h1 className="mt-5">{book.titulo}</h1>
            <div className="book-detail-content">
                <img 
                    src={book.cover} 
                    alt={book.titulo} 
                    className="img-fluid" 
                />
                <div>
                    <h2>Detalles del Libro</h2>
                    <p><strong>Autor:</strong> {book.autor}</p>
                    <p><strong>Género:</strong> {book.genero}</p>
                    <p><strong>Cantidad de Páginas:</strong> {book.cantidad_paginas}</p>
                    <p><strong>Año Publicado:</strong> {book.year}</p>
                    <p><strong>Descripción:</strong> {book.descripcion || "No disponible"}</p>
                    <button 
                        onClick={handleAddToFavorites} 
                        className="btn btn-primary mt-3"
                    >
                        {store.favorites.includes(book.id) ? "Quitar de Favoritos" : "Añadir a Favoritos"}
                    </button>
                </div>
            </div>
        </div>
    );
};
