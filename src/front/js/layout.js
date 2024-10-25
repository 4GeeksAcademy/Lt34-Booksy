import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { ReadersListOfBooks } from "./pages/readersListoOfBooks";
import { BookDetail } from "./pages/bookDetail";
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
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<SignupCritico />} path="/signupCritico" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<LoginCritico />} path="/loginCritico" />
                        <Route element={<BookDetailsCritic />} path="/books/:book_id" />
                        <Route element={<ListaLibrosCritico />} path="/listaLibrosCritico" />
                        <Route element={<Books />} path="/books" /> 
                        <Route element={<AddBook />} path="/addbook" /> 
                        <Route element={<EditBook />} path="/editbook/:id" /> 
                        <Route element={<SignupLector />} path="/signupLector" /> 
                        <Route element={<LoginLector />} path="/loginLector" /> 
                        <Route element={<ReadersListOfBooks />} path="/readersListOfBooks" />
                        <Route path="/bookdetails/:id" element={<BookDetail />} /> 
                        <Route element={<Lector />} path="/lector/:idLectorToEdit" />
                        <Route element={<h1>Not found!</h1>} path="*" /> 
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
