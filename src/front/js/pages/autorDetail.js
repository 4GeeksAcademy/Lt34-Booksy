import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const AutorDetail = () => {
    const { store, actions } = useContext(Context);
    const {autorName}=useParams()
    useEffect(() => {
        actions.getAutorDetails(autorName);

    }, []);
    console.log(store.autorDetail)
    // const {docs}=store.autorDetail
    // console.log(docs)
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="m-5">Autor</h1>
                <div className="row g-3">
                        {store.autorDetail?.docs?(
                            <div className="col-md-4">
                            <p><strong>Name:</strong>{store.autorDetail?.docs[0]?.name}<br /></p>
                            <p><strong>Birth Date:</strong>{store.autorDetail?.docs[0]?.birth_date} <br /></p>
                            <p><strong>Top subjects:</strong>{store.autorDetail?.docs[0]?.top_subjects}<br /></p>
                            <p><strong>Death date:</strong>{store.autorDetail?.docs[0]?.death_date}<br /></p>
                            </div>
                        ):null}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AutorDetail