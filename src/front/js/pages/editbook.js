import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/addbook.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const EditBook = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const [book, setBook] = useState({
        titulo: "",
        autor: "",
        cantidad_paginas: "",
        genero: "",
        year: "",
        cover: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const currentBook = store.books.find(b => b.id === parseInt(id));
        if (currentBook) {
            setBook(currentBook);
        }
    }, [id, store.books]);

    const handleEditBook = () => {
        actions.updateBook(book.id, {
            ...book,
            cantidad_paginas: Number(book.cantidad_paginas),
            year: Number(book.year),
        });
        navigate("/books");
    };

    if (!book) return <div>Cargando...</div>;

    return (
        <>
        <Navbar />
        <div className="container mt-5 card-addbook">
            <div className="card card-bleed shadow-light-lg mb-6">
                <div className="card-header">
                    <h4 className="mb-0">Editar Libro</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="titulo">Título</label>
                                    <input
                                        className="form-control"
                                        id="titulo"
                                        type="text"
                                        placeholder="Título del libro"
                                        value={book.titulo}
                                        onChange={e => setBook({ ...book, titulo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="autor">Autor</label>
                                    <input
                                        className="form-control"
                                        id="autor"
                                        type="text"
                                        placeholder="Nombre del autor"
                                        value={book.autor}
                                        onChange={e => setBook({ ...book, autor: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cantidad_paginas">Cantidad de Páginas</label>
                                    <input
                                        className="form-control"
                                        id="cantidad_paginas"
                                        type="number"
                                        placeholder="Número de páginas"
                                        value={book.cantidad_paginas}
                                        onChange={e => setBook({ ...book, cantidad_paginas: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="genero">Género</label>
                                    <input
                                        className="form-control"
                                        id="genero"
                                        type="text"
                                        placeholder="Género del libro"
                                        value={book.genero}
                                        onChange={e => setBook({ ...book, genero: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="year">Año de Publicación</label>
                                    <input
                                        className="form-control"
                                        id="year"
                                        type="number"
                                        placeholder="Año de publicación"
                                        value={book.year}
                                        onChange={e => setBook({ ...book, year: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cover">URL de la Imagen</label>
                                    <input
                                        className="form-control"
                                        id="cover"
                                        type="text"
                                        placeholder="URL de la imagen del libro"
                                        value={book.cover}
                                        onChange={e => setBook({ ...book, cover: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-auto">
                                <button
                                    className="btn w-100 btn-primary mt-3"
                                    type="button"
                                    onClick={handleEditBook}
                                >
                                    Actualizar Libro
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default EditBook;
