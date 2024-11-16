import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrash as trashIcon } from '@fortawesome/free-solid-svg-icons';
import "../../styles/readersListOfBooks.css";
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'; 
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons'; 
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const ReadersListOfBooks = () => {
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState("genero");
    const [showFavorites, setShowFavorites] = useState(false); 
    const [hover, setHover] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false); 
    const [searchTerm, setSearchTerm] = useState("");
    const [searchAuthor, setSearchAuthor] = useState(""); 
    const [searchGenero, setSearchGenero] = useState(""); 

    useEffect(() => {
        actions.getBooks();
    }, []);

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

    const handleFavoriteToggle = (bookId) => {
        actions.toggleFavorite(bookId); 
    };

    const handleWishlistToggle = (bookId) => {
        actions.toggleWishlist(bookId); 
    };

    const handleToggleFavorites = () => {
        setShowFavorites(prevState => !prevState);
    };

    const handleToggleWishlist = () => {
        setShowWishlist(prevState => !prevState);
    };

    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };

      const getRecentItems = (items) => {
        return items
            .map(itemId => store.books.find(book => book.id === itemId))  
            .filter(Boolean)  
            .reverse()  
            .slice(0, 3);  
    };
    

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

                <h6 className="fw-bold text-uppercase mb-3 mt-4">
                    Herramientas Booksy
                </h6>

                <div className="row card-list list text-gray-700 mb-0">
                    <nav className="nav flex-column">
                        <Link to="/chat" className="nav-item nav-link">
                            ChatScribe
                        </Link>
                        <Link to="/visionAPI" className="nav-item nav-link">
                            ScanBook
                        </Link>
                    </nav>    
                </div>

                <h6 className="fw-bold text-uppercase mb-3 mt-4">
                     Mi Biblioteca
                </h6>

                <div className="row card-list list text-gray-700 mb-0">
                    <nav className="nav flex-column">            
                       
                        <Link to="/favoritosLector" className="nav-item nav-link">
                            Favoritos
                        </Link>
                        <Link to="/wishlistLector" className="nav-item nav-link">
                            Wishlist
                        </Link>
                    </nav>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                    <Link to="/bookRecommendations" className="no-underline">
                        <button className="buttonAI">
                            <div className="dots_border"></div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="sparkle"
                            >
                                <path
                                className="path"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="black"
                                fill="black"
                                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                                ></path>
                                <path
                                className="path"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="black"
                                fill="black"
                                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                                ></path>
                                <path
                                className="path"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="black"
                                fill="black"
                                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                                ></path>
                            </svg>
                            <span className="text_button">
                               
                                    
                                
                            </span>
                        </button>
                        </Link>
                </div>
                </div>



                </div>
              </div>

            </div>

          </div>
          <div className="col-12 col-md-9">

            
            <div className="card card-bleed shadow-light-lg mb-6 me-0 ms-3">
              <div className="card-body">

                
              <div className="row">
                {activeTab === "genero" && Object.keys(booksByGenero).map((genero, index) => (
                    <div key={index} className="col-md-6">
                        <h2>{genero}</h2>
                        <div className="row flex-row flex-nowrap" style={{ overflowX: "auto" }}>
                            {booksByGenero[genero].map((book, idx) => (
                                <div key={idx} className="card" style={{ width: '18rem', marginRight: '1rem' }}>
                                    <Link to={`/bookdetails/${book.id}`} className="card-title mb-0 text-decoration-none text-dark">
                                        <img
                                            src={book.cover}
                                            alt={book.titulo}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
                                        />
                                    </Link>
                                    <div className="card-body">
                                    <Link to={`/bookdetails/${book.id}`} className="card-title mb-0 text-decoration-none text-dark">
                                        <h5 className="card-title" style={{ marginBottom: '5px', height: '30px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{truncateText(book.titulo, 5)}</h5>
                                    </Link>
                                        <p className="card-text">
                                            <strong>Autor:</strong> {truncateText(book.autor, 4)}<br />
                                            <strong>Cantidad de Páginas:</strong> {book.cantidad_paginas} <br />
                                            <strong>Año Publicado:</strong> {book.year}
                                        </p>
                                        <span 
                                            onClick={() => handleFavoriteToggle(book.id)} 
                                            className="favorite-icon"
                                        >
                                            <FontAwesomeIcon icon={store.favorites.includes(book.id) ? solidHeart : regularHeart} />
                                        </span>
                                        <span 
                                            onClick={() => handleWishlistToggle(book.id)} 
                                            className="wishlist-icon ms-2"
                                        >
                                            <FontAwesomeIcon icon={store.wishlist.includes(book.id) ? solidBookmark : regularBookmark} />
                                        </span>
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
                                        style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{truncateText(book.titulo, 5)}</h5> 
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
                                        <span 
                                            onClick={() => handleWishlistToggle(book.id)} 
                                            className="wishlist-icon ms-2"
                                        >
                                            <FontAwesomeIcon icon={store.wishlist.includes(book.id) ? solidBookmark : regularBookmark} />
                                        </span>
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
        </div>
        <Footer />
    </>
    );
};
