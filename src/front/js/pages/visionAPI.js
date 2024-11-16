import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

const VisionAPI = () => {
  const [image, setImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) return;

    const apiKey = 'AIzaSyBwjy42UMUJBiaTBw-cLmkxixGvX0iyMD4'; 
    const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const body = {
      requests: [
        {
          image: {
            content: image.split(',')[1], 
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(visionUrl, body);
      const detectedText = response.data.responses[0].fullTextAnnotation?.text;

      // Registro en la consola del texto detectado
      console.log('Texto Detectado:', detectedText || 'No se detectó texto');

      // Realizar búsqueda en Google
      if (detectedText) {
        await fetchSearchResults(detectedText);
      }
    } catch (error) {
      console.error('Error al llamar a Google Vision API:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        console.error('Detalles del error:', error.response.data);
      }
    }
  };

  const fetchSearchResults = async (query) => {
    const apiKey = 'AIzaSyBwjy42UMUJBiaTBw-cLmkxixGvX0iyMD4'; 
    const cx = '00c8f40cacd4e44a4'; 
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(searchUrl);
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error('Error al llamar a la API de búsqueda personalizada de Google:', error);
    }
  };

  return (
    <>
        <Navbar />
    <div className="container mt-5">
      <h1 className="text-center mb-4">BooksyQuest</h1>
      <p className="text-center mb-4">
      Sube una foto del libro de tu interés nosotros hacemos el resto =)
      </p>
      <form onSubmit={handleSubmit} className="text-center mb-4">
        <div className="form-group">
          <label className="btn btn-outline-primary">
            Subir Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="d-none" 
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Enviar</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2 className="mb-4">Resultados de Búsqueda:</h2>
          <ul className="list-group">
            {searchResults.map((result) => (
              <li className="list-group-item" key={result.link} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px' }}>
                <a href={result.link} target="_blank" rel="noopener noreferrer" className="font-weight-bold text-dark">
                  {result.title}
                </a>
                <p className="mb-0 text-muted">{result.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default VisionAPI;
