import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Importando los íconos
import "../../styles/bookDetail.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const BookDetail = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [book, setBook] = useState(null);
    const [description, setDescription] = useState("");
    const [reviews, setReviews] = useState([]);
    const [infoLink, setInfoLink] = useState(""); 

    useEffect(() => {
        const foundBook = store.books.find((b) => b.id === parseInt(id));
        if (foundBook) {
            setBook(foundBook);
            fetchBookDescription(foundBook.titulo);
            fetchBookReviews(foundBook.id);
            fetchBookPurchaseLink(foundBook.titulo); 
        }
    }, [id, store.books]);

    const fetchBookDescription = async (title) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const bookDetails = data.items[0].volumeInfo;
                setDescription(bookDetails.description || "Descripción no disponible");
            } else {
                setDescription("Descripción no disponible");
            }
        } catch (error) {
            console.log("Error fetching book description", error);
            setDescription("Descripción no disponible");
        }
    };

    const fetchBookReviews = async (bookId) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/reviews?book_id=${bookId}`);
            if (!response.ok) throw new Error("Error fetching reviews");
            const data = await response.json();
            setReviews(data); 
        } catch (error) {
            console.log("Error fetching reviews", error);
        }
    };
    
    const fetchBookPurchaseLink = async (title) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const bookDetails = data.items[0].volumeInfo;
                setInfoLink(bookDetails.infoLink || ""); 
            }
        } catch (error) {
            console.log("Error fetching purchase link", error);
        }
    };

    const handleAddToFavorites = () => {
        if (book) {
            actions.toggleFavorite(book.id);
        }
    };

    const handleAddToWishlist = () => {
        if (book) {
            actions.toggleWishlist(book.id);
        }
    };

    if (!book) {
        return <div>Cargando...</div>;
    }

    return (
        <>
        <Navbar />
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
                    <p><strong>Descripción:</strong> {description || "No disponible"}</p>
                    
                    {/* Botón de compra */}
                    <button className="buttonBuy">
                        <svg viewBox="0 0 16 16" className="bi bi-cart-check" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                        {infoLink && (
                            <a href={infoLink} target="_blank" rel="noopener noreferrer" className="text">
                            Comprar
                            </a>
                        )}
                    </button>
                </div>
            </div>

            <h2 className="mt-4">Reseñas</h2>
            <ul className="list-group">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id} className="list-group-item">
                            <strong>{review.id_critico}:</strong> {review.comentario}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No hay reseñas disponibles.</li>
                )}
            </ul>
        </div>
        <Footer />
        </>
    );
};
