import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/addbook.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Books = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        actions.getBooks();
    }, []);

    const filteredBooks = store.books?.filter(book =>
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <Navbar />
        <div className="container mt-5 card-addbook">
            <div className="card card-bleed shadow-light-lg mb-6">
                <div className="card-header">
                    <h4 className="mb-0">Libros</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                {/* Añadir nuevo libro */}
                                <div className="form-group">
                                    <Link to="/addbook" className="btn btn-primary w-100">
                                        Añadir un nuevo libro
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                {/* Buscar libro */}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control w-100"
                                        placeholder="Buscar por título"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Listado de libros filtrados */}
                    <div className="row flex-row flex-nowrap" style={{ overflowX: "auto" }}>
                        {filteredBooks && filteredBooks.map((book, index) => (
                            <div key={index} className="col-12 col-md-4 mb-4">
                                <div className="card" style={{ width: '18rem' }}>
                                    <img
                                        src={book.cover}
                                        alt={book.titulo}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.titulo}</h5>
                                        <p className="card-text">
                                            <strong>Autor:</strong> {book.autor} <br />
                                            <strong>Cantidad de Páginas:</strong> {book.cantidad_paginas} <br />
                                            <strong>Género:</strong> {book.genero} <br />
                                            <strong>Año Publicado:</strong> {book.year} <br />
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/editbook/${book.id}`} className="btn btn-success flex-fill me-2">
                                                Editar
                                            </Link>
                                            <div
                                                className="btn btn-danger flex-fill ms-2"
                                                onClick={() => actions.deleteBook(book.id)}
                                            >
                                                Eliminar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};
