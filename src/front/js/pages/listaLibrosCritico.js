import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/listalibroscritico.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const ListaLibrosCritico = () => {
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState("genero");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchGenero, setSearchGenero] = useState("");

    useEffect(() => {
        actions.getBooks();
    }, []);

    if (!store.auth) {
        return (
            <div>
                <Link to="/">
                    <button className="btn btn-primary">Back home</button>
                </Link>
            </div>
        );
    }

    const filteredBooks = store.books.filter(book =>
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        book.autor.toLowerCase().includes(searchAuthor.toLowerCase()) &&
        book.genero.toLowerCase().includes(searchGenero.toLowerCase())
    );

    const groupBooks = (key) => {
        return filteredBooks.reduce((acc, book) => {
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

    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(' ') + '...';
    };

    return (
      <>
        <Navbar />
      <div className="container page-container"> 
          <div className="row" style={{ width: '100%' }}> 

              <div className="col-12 col-md-3" >
                  <div className="card card-bleed border-bottom border-bottom-md-0 shadow-light-lg me-5"> 

                      <div className="collapse d-md-block" id="sidenavCollapse">
                          <div className="card-body">

                              <h6 className="fw-bold text-uppercase mb-3">
                                  Filtro
                              </h6>

                              <div className="row card-list list text-gray-700 mb-0">
                                  <nav className="nav flex-column">
                                      <Link
                                          to="#"
                                          className={`nav-link ${activeTab === "genero" ? "active" : ""}`}
                                          onClick={(e) => {
                                              e.preventDefault();
                                              setActiveTab(activeTab === "genero" ? "" : "genero");
                                          }}
                                          >
                                          Por Género
                                      </Link>
                                      <Link
                                          to="#"
                                          className={`nav-link ${activeTab === "autor" ? "active" : ""}`}
                                          onClick={(e) => {
                                              e.preventDefault();
                                              setActiveTab(activeTab === "autor" ? "" : "autor");
                                          }}
                                          >
                                          Por Autor
                                      </Link>
                                  </nav>
                              </div>               

                              <h6 className="fw-bold text-uppercase mb-4 mt-2">
                                  Buscar Por
                              </h6>

                              <ul className="card-list list text-gray-700 mb-0">
                                <li className="list-item">
                                    <input
                                    type="text"
                                    className="form-control me-2 input mb-1"
                                    placeholder="Título..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ flex: 1 }} 
                                />
                                </li>
                                <li className="list-item">
                                    <input
                                    type="text"
                                    className="form-control me-2 input mb-1"
                                    placeholder="Autor..."
                                    value={searchAuthor}
                                    onChange={(e) => setSearchAuthor(e.target.value)}
                                    style={{ flex: 1 }} 
                                />
                                </li>
                                <li className="list-item">
                                    <input
                                    type="text"
                                    className="form-control input"
                                    placeholder="Género..."
                                    value={searchGenero}
                                    onChange={(e) => setSearchGenero(e.target.value)}
                                    style={{ flex: 1 }} 
                                />
                                </li>
                              </ul>

                              
                              

                          </div>
                      </div>

                  </div>
              </div>

              <div className="col-12 col-md-9">
  <div className="card card-bleed shadow-light-lg mb-6">
    <div className="card-body">
      <div className="row">
        {activeTab === "genero" &&
          Object.keys(booksByGenero).map((genero, index) => (
            <div key={index} className="col-md-6 mb-4">
              <h2>{genero}</h2>
              <div className="row flex-nowrap" style={{ overflowX: "auto" }}>
                {booksByGenero[genero].map((book, idx) => (
                  <div key={idx} className="card me-3" style={{ width: "18rem" }}>
                    <Link to={`/books/${book.id}`}>
                      <img
                        src={book.cover}
                        alt={book.titulo}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                    </Link>
                    <div className="card-body">
                      <Link className="no-underline2 " to={`/books/${book.id}`}>
                        <h5 className="text">{truncateText(book.titulo, 5)}</h5>
                      
                      </Link>
                      <p>
                        <strong>Autor:</strong> {truncateText(book.autor, 4)}<br />
                        <strong>Páginas:</strong> {book.cantidad_paginas}<br />
                        <strong>Año:</strong> {book.year}
                      </p>
                      <div className="d-flex justify-content-center">
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {activeTab === "autor" &&
          Object.keys(booksByAutor).map((autor, index) => (
            <div key={index} className="col-md-6 mb-4">
              <h2>{autor}</h2>
              <div className="row flex-nowrap" style={{ overflowX: "auto" }}>
                {booksByAutor[autor].map((book, idx) => (
                  <div key={idx} className="card me-3" style={{ width: "18rem" }}>
                    <img
                      src={book.cover}
                      alt={book.titulo}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <Link className="no-underline2 " to={`/books/${book.id}`}>
                          <h5 className="text">{truncateText(book.titulo, 5)}</h5>
                      </Link>
                      <p>
                        <strong>Género:</strong> {book.genero}<br />
                        <strong>Páginas:</strong> {book.cantidad_paginas}<br />
                        <strong>Año:</strong> {book.year}
                      </p>
                      <div className="d-flex justify-content-center">
                      
                      
                     
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
</div>

            </div>

            <Link to="/">
                <button className="btn btn-primary my-5">Back home</button>
            </Link>
        </div>
        <Footer />
        </>
    );
};
