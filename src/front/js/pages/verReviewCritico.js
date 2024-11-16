import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const CriticReviews = () => {
    const { store, actions } = useContext(Context);
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null); 
    const [editedComment, setEditedComment] = useState(""); 

    useEffect(() => {
        const fetchReviews = async () => {
            await actions.getReviews();
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        const filteredReviews = store.reviews.filter((r) => r.id_critico === store.userId);
        setReviews(filteredReviews);
    }, [store.reviews, store.userId]);

    const handleDeleteReview = async (reviewId) => {
        const deleted = await actions.deleteReview(reviewId); 
        if (deleted) {
            setReviews(reviews.filter((r) => r.id !== reviewId));
        } else {
            console.error("Error al eliminar la reseña.");
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
            setEditingReviewId(null); 
            setEditedComment(""); 
        } else {
            console.error("Error al editar la reseña.");
        }
    };
    
    return (
        <>
        <Navbar />
        <div className="container">
            <h2>Mis Reseñas</h2>
            {editingReviewId ? ( 
                <form onSubmit={handleEditSubmit} className="mb-4">
                    <div className="input-group">
                        <textarea
                            className="form-control"
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingReviewId(null)}>Cancelar</button>
                    </div>
                </form>
            ) : (
                <ul className="list-group">
                    {reviews.map((r) => (
                        <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{r.id_critico}:</strong> {r.comentario}
                            </div>
                            <div>
                                <button 
                                    className="btn btn-warning btn-sm mr-2" 
                                    onClick={() => handleEditClick(r)} 
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDeleteReview(r.id)} 
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/listaLibrosCritico">
                <span className="btn btn-primary btn-lg my-5" role="button">
                    Back to list
                </span>
            </Link>
        </div>
        <Footer />
        </>
    );
};

