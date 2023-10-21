import React, { useEffect, useState } from "react";

function App() {
  const [piada, setPiada] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritosSalvos) {
      setFavoritos(favoritosSalvos);
    }
  }, []);

  useEffect(() => {
    buscarProximaPiada();
  }, []);

  const buscarProximaPiada = () => {
    fetchPiada();
  };

  const fetchPiada = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => setPiada(data.value))
      .catch((error) => console.error(error));
  };

  const curtirPiada = () => {
    if (!favoritos.includes(piada)) {
      const novosFavoritos = [...favoritos, piada];
      setFavoritos(novosFavoritos);

      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  const limparFavoritos = () => {
    setFavoritos([]);
    localStorage.removeItem("favoritos");
  };

  const removerFavorito = (index) => {
    const favoritosAtualizados = [...favoritos];
    favoritosAtualizados.splice(index, 1);
    setFavoritos(favoritosAtualizados);

    localStorage.setItem("favoritos", JSON.stringify(favoritosAtualizados));
  };

  return (
    <div>
      <section className="site-info">
        <header className="page-header">
        <h1>Piadas que fariam o Chuck Norris sorrir</h1>
        <hr className="header-separator" />
        <div className="centered-text">
    <p>Este site é dedicado às piadas de Chuck Norris, o famoso ator e artista marcial. Chuck Norris é conhecido por suas habilidades excepcionais e pelo humor único associado a ele.</p>
    <p>Nosso objetivo é proporcionar a você uma experiência divertida, compartilhando algumas das melhores piadas de Chuck Norris.</p>
    <p>OBS: As piadas estão disponíveis apenas em inglês.</p>
  </div>
         </header>
      </section>

      <hr />

      <section className="piada-section">
        <h2>Piadas:</h2>
        <p>{piada}</p>
        <button onClick={curtirPiada}>Curtir a piada</button>
        <button onClick={buscarProximaPiada}>Conta outra!</button>
      </section>

      <section className="favoritos-section">
        <h2>Favoritos</h2>
        <ul>
          {favoritos.map((piadaFavorita, index) => (
            <li key={index}>
              <div className="favorito-item">
                <span>{piadaFavorita}</span>
                <button onClick={() => removerFavorito(index)}>X</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={limparFavoritos}>Limpar todas as favoritas</button>
      </section>
    </div>
  );
}

export default App;
import "./App.css";
