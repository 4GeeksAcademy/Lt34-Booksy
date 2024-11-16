import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Books } from "./pages/books";
import AddBook from "./pages/addbook"; 
import EditBook from "./pages/editbook";
import injectContext from "./store/appContext";
import SignupCritico from "./pages/signupCritico";
import SignupLector from "./pages/signupLector";
import Lector from "./pages/lector";
import { LoginLector } from "./pages/loginLector";
import LoginCritico from "./pages/loginCritico";
import { ListaLibrosCritico } from "./pages/listaLibrosCritico";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { BookDetailsCritic } from "./pages/bookDetailsCitic";
import { ReadersListOfBooks } from "./pages/readersListOfBooks";
import { BookDetail } from "./pages/bookDetail";
import { FavoritosLector } from './pages/favoritosLector';
import { WishlistLector } from "./pages/wishlistLector";
import BooksyAdmin from "./pages/booksyadministrador";
import PrivateRouteLector from "./pages/privateRouteLector";
import { CriticReviews } from "./pages/verReviewCritico";
import ProfileCritico from "./pages/perfilCritico";
import ProfileLector from "./pages/perfilLector";
import LoginAdmin from "./pages/loginAdmin";
import BookRecommendations from "./pages/bookRecommendations";
import { Chat } from "./pages/chat";
import AutorDetail from "./pages/autorDetail";
import VisionAPI from "./pages/visionAPI";
import PrivateRouteCritico from "./pages/privateRouteCritico";
import PrivateRouteAdmin from "./pages/privateRouteAdmin";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    // Verificación del URL de backend
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<SignupCritico />} path="/signupCritico" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<LoginCritico />} path="/loginCritico" />
                        <Route element={<PrivateRouteCritico element={<BookDetailsCritic />} />} path="/books/:book_id" />
                        <Route element={<PrivateRouteCritico element={<ListaLibrosCritico />} />} path="/listaLibrosCritico" />
                        <Route element={<PrivateRouteCritico element={<CriticReviews />} />} path="/verReviewCritico" />
                        <Route element={<PrivateRouteCritico element={<ProfileCritico />} />} path="/perfilCritico" />
                        <Route element={<ProfileLector />} path="/perfilLector" />
                        <Route element={<PrivateRouteAdmin element={<Books />} />} path="/books" />
                        <Route element={<PrivateRouteAdmin element={<AddBook />} />} path="/addbook" />
                        <Route element={<PrivateRouteAdmin element={<EditBook />} />} path="/editbook/:id" />
                        <Route element={<SignupLector />} path="/signupLector" /> 
                        <Route element={<BooksyAdmin />} path="/booksyAdmin" /> 
                        <Route element={<LoginAdmin />} path="/loginAdmin" /> 
                        <Route element={<LoginLector />} path="/loginLector" />  
                        <Route element={<Chat />} path="/chat" /> 
                        <Route element={<VisionAPI />} path="/visionAPI" />  
                        <Route element={<LoginLector />} path="/loginLector" /> 
                        <Route element={<PrivateRouteLector element={<ReadersListOfBooks />} />} path="/readersListOfBooks" />
                        <Route element={<PrivateRouteLector element={<BookRecommendations />} />} path="/bookRecommendations" />
                        <Route element={<PrivateRouteLector element={<FavoritosLector />} />} path="/favoritosLector" />
                        <Route element={<PrivateRouteLector element={<WishlistLector />} />} path="/wishlistLector" />
                        <Route element={<PrivateRouteLector element={<BookDetail />} />} path="/bookdetails/:id" /> 
                        <Route element={<Lector />} path="/lector/:idLector" />
                        <Route element={<AutorDetail />} path="/autorDetail/:autorName" />

                        <Route element={<h1>Not found!</h1>} path="*" /> 
                    </Routes>
                    
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
