import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/bookDetailsCritic.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const BookDetailsCritic = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [bookData, setBookData] = useState(null);
    const [infoLink, setInfoLink] = useState(""); 
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState(store.reviews);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    async function fetchBook(bookDataTitulo) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookDataTitulo)}`);
            const data = await response.json();
    
            if (data.items && data.items.length > 0) {
                return data.items[0].volumeInfo; 
            } else {
                console.log('No se encontraron libros.');
                return null; 
            }
        } catch (error) {
            console.error('Error al buscar el libro:', error);
            return null; 
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            await actions.getReviews(params.book_id);
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/book/${params.book_id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBookData(data.book);
                setReviews(store.reviews);

                
                if (data.book && data.book.titulo) {
                    const book = await fetchBook(data.book.titulo);
                    if (book) {
                        setInfoLink(book.infoLink); 
                        console.log(book)
                    }
                }
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchBookData();
    }, [params.book_id, store.reviews]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const newReview = await actions.addReview(store.userId, params.book_id, review);
        if (newReview) {
            actions.getReviews(params.book_id);
            setReview("");
        } else {
            console.error("Error al agregar la reseña.");
        }
    };

    const handleEditClick = (review) => {
        setEditingReviewId(review.id);
        setEditedComment(review.comentario);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedReview = { comentario: editedComment };
        const edited = await actions.editReview(updatedReview, editingReviewId);
        if (edited) {
            actions.getReviews(params.book_id); 
            setEditingReviewId(null);
            setEditedComment("");
        } else {
            console.error("Error al editar la reseña.");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const deleted = await actions.deleteReview(reviewId);
        if (deleted) {
            actions.getReviews(params.book_id); 
        } else {
            console.error("Error al eliminar la reseña.");
        }
    };

    if (!bookData) return <p>Cargando detalles del libro...</p>;

    return (
        <>
        <Navbar />
        <div className="book-detail-container">
            <h1 className="mt-5">{bookData.titulo}</h1>
            <div className="book-detail-content">
                <img 
                    src={bookData.cover} 
                    alt={bookData.titulo} 
                    className="img-fluid" 
                />
                <div>
                    <h2>Detalles del Libro</h2>
                    <p><strong>Autor:</strong> {bookData.autor}</p>
                    <p><strong>Cantidad de Páginas:</strong> {bookData.cantidad_paginas}</p>
                    <p><strong>Género:</strong> {bookData.genero}</p>
                    <p><strong>Año Publicado:</strong> {bookData.year}</p>

                    {infoLink && (
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
                    )}
                </div>
            </div>

            <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Agregar una reseña</label>
                    <textarea
                        id="review"
                        className="form-control"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Enviar Reseña</button>
            </form>

            <h2 className="mt-4">Reseñas</h2>
            <ul className="list-group">
                {reviews.map((r) => (
                    <li key={r.id} className="list-group-item">
                        <strong>{r.id_critico}:</strong> {editingReviewId === r.id ? (
                            <form onSubmit={handleEditSubmit}>
                                <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-success btn-sm">Guardar</button>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingReviewId(null)}>Cancelar</button>
                            </form>
                        ) : (
                            <span>{r.comentario}</span>
                        )}
                        <div className="float-end">
                            {editingReviewId !== r.id && (
                                <>
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleEditClick(r)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReview(r.id)}>Eliminar</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <Link to="/listaLibrosCritico">
                <span className="btn btn-primary btn mt-3" role="button">
                    Volver a la lista
                </span>
            </Link>
        </div>
        <Footer />
        </>
    );
};
