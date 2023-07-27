import React, { useState } from 'react';
import './Home.css';
import travelImage from '../src/img/logoipsum.svg'; // Ruta de la imagen que desees utilizar
import loader from '../src/img/loader.gif'; // Ruta de la imagen que desees utilizar

const CHATGPT_KEY = 'TU_CLAVE'; // Reemplaza 'TU_CLAVE' con tu clave de API de ChatGPT

const Home = () => {
  const [destination, setDestination] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  function showLoading() {
    setIsLoading(true);
  }

  function hideLoading() {
    setIsLoading(false);
  }

  async function callToChatGpt(prompt) {
    const bodyRequest = {
      model: 'gpt-3.5-turbo',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    };

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer sk-ACAELCODIGODELACLAVEAPISINELSK-`, // Replace with your authorization token
      },
      body: JSON.stringify(bodyRequest),
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', request);
    const json = await response.json();
    setIsLoading(false); // Hide loading after receiving the response
    return json.choices[0].message.content;
  }

  const handleChange = (event) => {
    setDestination(event.target.value);
  };

  const handleSubmit = async () => {
    showLoading();
    const prompt = getPrompt(destination);
    const response = await callToChatGpt(prompt);
    setItinerary(response);
  };

  function getPrompt(destination) {
    return `Eres un guía turístico, necesito que me armes el itinerario de un viaje
    a  ${destination}. El viaje va a durar una semana, hazme una lista de
    actividades, lugares donde comer, etc...Es importante que no hagas
    ningún tipo de saludo o algo por el estilo¿simplemente muestra el
    itinerario. En cada día indica que cosas hacer y donde comer. 
    Escribe cada parte del día como una lista, uno debajo del otro.`;
  }

  return (
    <div className="container">
      {isLoading && (
        <div className="loading">
          <img src={loader} alt="Travel" className="header-image" />
        </div>
      )}
      <img src={travelImage} alt="Travel" className="header-image" />
      <h1 className="title">Generador de Bitácoras de Viaje Online</h1>
      <div className="form-container">
        <label htmlFor="destination">¿A dónde quieres viajar?</label>
        <div className="input-container">
          <input
            type="text"
            id="destination"
            className="text-input"
            placeholder="Ingresa tu destino aquí"
            value={destination}
            onChange={handleChange}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </div>
      {itinerary && (
        <div className="additional-container">
          <p className="additional-text">{itinerary}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
