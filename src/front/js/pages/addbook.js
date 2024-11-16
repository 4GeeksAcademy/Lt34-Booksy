import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/addbook.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const AddBook = () => {
    const { store, actions } = useContext(Context);
    const [newBook, setNewBook] = useState({
        titulo: "",
        autor: "",
        cantidad_paginas: "",
        genero: "",
        year: "",
        cover: ""
    });
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAutor, setSelectedAutor] = useState(null);
    const [categories, setCategories] = useState([]);
    const [autores, setAutores] = useState([]);
    const [name, setName] = useState('');
    const [nameAutor, setNameAutor] = useState('');
    const navigate = useNavigate();

    const handleAddBook = () => {
        actions.addBook({
            ...newBook,
            cantidad_paginas: Number(newBook.cantidad_paginas),
            year: Number(newBook.year),
            book_categories: categories,
            book_autores: autores
        });
        navigate("/books");
    };

    const fetchBookDetails = async (title) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyBwjy42UMUJBiaTBw-cLmkxixGvX0iyMD4`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const books = data.items.map(item => item.volumeInfo);
                setSuggestions(books.slice(0, 5)); 
            } else {
                setSuggestions([]); 
            }
        } catch (error) {
            console.log("Error fetching book details", error);
        }
    };

    const handleSuggestionClick = (book) => {
        setNewBook({
            ...newBook,
            titulo: book.title,
            autor: book.authors ? book.authors.join(", ") : "",
            cantidad_paginas: book.pageCount || "",
            genero: book.categories ? book.categories.join(", ") : "",
            year: book.publishedDate ? book.publishedDate.split("-")[0] : "",
            cover: book.imageLinks ? book.imageLinks.thumbnail : "",
        });
        setSuggestions([]); 
    };

    const autorDetail = () => {
        if (newBook.autor) {
            navigate(`/autorDetail/${newBook.autor}`)
        }
    }

    return (
        <>
        <Navbar />
        <div className="container mt-5 card-addbook">
            <div className="card card-bleed shadow-light-lg mb-6 ">
                <div className="card-header">
                    <h4 className="mb-0">Añadir Libro</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="titulo">Buscar Libro</label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        className="form-control"
                                        value={newBook.titulo}
                                        onChange={e => {
                                            setNewBook({ ...newBook, titulo: e.target.value });
                                            fetchBookDetails(e.target.value); 
                                        }}
                                    />
                                    {suggestions.length > 0 && (
                                        <ul className="list-group position-absolute" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                            {suggestions.map((book, index) => (
                                                <li key={index} className="list-group-item" onClick={() => handleSuggestionClick(book)}>
                                                    {book.title}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="autor">Autor</label>
                                    <input
                                        type="text"
                                        id="autor"
                                        className="form-control"
                                        value={newBook.autor}
                                        onChange={e => setNewBook({ ...newBook, autor: e.target.value })}
                                    />
                                    <button type="button" className="btn btn-primary mt-2" onClick={autorDetail}>
                                        Ver detalle del autor
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cantidad_paginas">Cantidad de Páginas</label>
                                    <input
                                        type="number"
                                        id="cantidad_paginas"
                                        className="form-control"
                                        value={newBook.cantidad_paginas}
                                        onChange={e => setNewBook({ ...newBook, cantidad_paginas: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="genero">Género</label>
                                    <input
                                        type="text"
                                        id="genero"
                                        className="form-control"
                                        value={newBook.genero}
                                        onChange={e => setNewBook({ ...newBook, genero: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="year">Año Publicado</label>
                                    <input
                                        type="number"
                                        id="year"
                                        className="form-control"
                                        value={newBook.year}
                                        onChange={e => setNewBook({ ...newBook, year: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-2">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cover">URL de la Imagen</label>
                                    <input
                                        type="text"
                                        id="cover"
                                        className="form-control"
                                        value={newBook.cover}
                                        onChange={e => setNewBook({ ...newBook, cover: e.target.value })}
                                    />
                                </div>
                            </div>
                           
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Categoría</label>
                                    <select
                                        defaultValue={0}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value={0} disabled>Selecciona una categoría</option>
                                        {store.categories?.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Crear nueva categoría"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mt-2"
                                        onClick={() => actions.addCategory(name)}
                                    >
                                        Agregar Categoría
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary mt-2"
                                        onClick={() => selectedCategory && !categories.includes(selectedCategory) && setCategories([...categories, selectedCategory])}
                                    >
                                        Seleccionar Categoría
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                        <label className="form-label">Autor</label>
                        <select
                            defaultValue={0}
                            onChange={(e) => setSelectedAutor(e.target.value)}
                            className="form-select"
                        >
                            <option value={0} disabled>Seleccione un autor</option>
                            {store.autores?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <ul style={{ marginBottom: '0.5rem'}}>
                            {autores.map(id => {
                                const autor = store.autores.find(auth => auth.id === id);
                                return autor ? <li key={autor.id}>{autor.name}</li> : null;
                            })}
                        </ul>
                        <input
                            value={nameAutor}
                            onChange={(e) => setNameAutor(e.target.value)}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Crear nuevo autor"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-primary mt-2"
                            onClick={() => actions.addAutor(nameAutor)}
                        >
                            Agregar Autor
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary mt-2"
                            onClick={() => selectedAutor && !autores.includes(selectedAutor) && setAutores([...autores, selectedAutor])}
                        >
                            Seleccionar Autor
                        </button>
                    </div>

                            <div className="col-12 col-md-auto">
                                <button className="btn w-100 btn-primary" type="submit" onClick={handleAddBook}>
                                    Guardar Cambios
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

export default AddBook;
