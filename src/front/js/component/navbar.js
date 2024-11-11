import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";



export const Navbar = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    function handleLogoutCritico() {
        actions.logoutCritico();
        navigate("/");
    }

    function handleLogoutLector() {
        actions.logoutLector(); // Asegúrate de definir esta acción en el flux
        navigate("/");
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="logo-url.png" 
                            alt="Booksy Logo"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />
                    </Link>
                    <Link to="/readersListOfBooks" className="nav-link ml-2">
                        Lista de Libros
                    </Link>
                    <Link to="/books" className="nav-link ml-2">
                        Añadir/Quitar/Editar Libro
                    </Link>
                </div>

                <div className="d-flex align-items-center">
                    {store.auth ? (
                        <>
                            {store.userType === "critic" ? (
                                <>
                                    <button onClick={handleLogoutCritico} className="btn btn-primary">Logout</button>
                                    <Link to="/verReviewCritico">
                                        <button className="btn btn-primary">My Reviews</button> 
                                    </Link>
                                    <Link to="/perfilCritico" className="btn btn-secondary ml-2">Perfil</Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleLogoutLector} className="btn btn-primary">Logout</button>
                                    <Link to="/perfilLector" className="btn btn-secondary ml-2">Perfil</Link>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Login
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/loginLector">Como Lector</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/loginCritico">Como Crítico</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/loginAdmin">Como Administrador</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown ml-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Signup
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/signupLector">Como Lector</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/signupCritico">Como Crítico</Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
