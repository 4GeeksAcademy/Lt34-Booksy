import React, { useContext } from "react";
import { Context } from "../store/appContext";
import booksyImage from "../../img/booksy.jpg"; // Importa la imagen
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar />
      <div className="home-container" style={{ backgroundImage: `url(${booksyImage})` }}>
        <div className="text-center mt-5">
          <h1>Bienvenido a Booksy</h1>
          <p>Donde las historias cobran vida.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
