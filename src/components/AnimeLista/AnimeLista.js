import AnimeCard from "../AnimeCard/AnimeCard";
import AnimeDetalhes from "../AnimeDetalhes/AnimeDetalhes";
import "./AnimeLista.css";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player';

const AnimeLista = () => {
  const [animes, setAnimes] = useState([]);
  // Estado para o anime selecionado
  const [animeClicado, setAnimeClicado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAnimes();
  }, []);

  const getAnimes = async () => {
    const response = await fetch("http://localhost:3005/Animes");

    const data = await response.json();

    setAnimes(data);
    console.log(data);
  };

  const animeClick = (anime) => {
    // Atualiza o estado com o anime selecionado
    setAnimeClicado(anime);
    setShowModal(true);
  };

  const fecharModal = () => setShowModal(false);

  return (
    <>
      <div className="card-group">
        {animes.map((anime) => (
          <div key={anime.id} onClick={() => animeClick(anime)}>
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
      <AnimeDetalhes>
        {/* Estrutura do Modal usando classes do Bootstrap 
        Exibe detalhes se um anime estiver selecionado*/}
        {showModal && animeClicado && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={fecharModal}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{animeClicado.titulo}</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" type="button" onClick={fecharModal}>
                  </button>
                </div>
                <div className="modal-body">
                    <p>{animeClicado.descricao}</p>
                    <img src={animeClicado.poster} alt={`poster do anime ${animeClicado.titulo}`}/>
                    <p>{animeClicado.genero}</p>
                    <p>{animeClicado.ano}</p>
                    <p>{animeClicado.temporadas}</p>
                    <p>{animeClicado.classificacao}</p>
                    <ReactPlayer url={animeClicado.trailer}/>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimeDetalhes>
    </>
  );
};

export default AnimeLista;
