import AnimeCard from "../AnimeCard/AnimeCard";
import AnimeDetalhes from "../AnimeDetalhes/AnimeDetalhes";
import FiltroBusca from "../FiltroBusca/FiltroBusca";
import "./AnimeLista.css";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const AnimeLista = () => {
  const [animes, setAnimes] = useState([]);
  // Estado para o anime selecionado
  const [animeClicado, setAnimeClicado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtraAnimes, setFiltraAnimes] = useState([]);

  useEffect(() => {
    getAnimes();
  }, []);

  const getAnimes = async () => {
    const response = await fetch("http://localhost:3005/Animes");

    const data = await response.json();

    setAnimes(data);
    setFiltraAnimes(data);
  };

  const animeClick = (anime) => {
    // Atualiza o estado com o anime selecionado
    setAnimeClicado(anime);
    setShowModal(true);
  };

  const fecharModal = () => setShowModal(false);

  const handlePesquisa = (pesquisaTermo, selecionadoGenero) => {
    const filtrado = animes.filter((anime) => {
      const tituloCorrespondente = anime.titulo
        .toLowerCase()
        .includes(pesquisaTermo.toLowerCase());

      const generoCorrespondente = selecionadoGenero
        ? anime.genero === selecionadoGenero
        : true;

      return tituloCorrespondente && generoCorrespondente;
    });

    setFiltraAnimes(filtrado);
  };

  return (
    <>
      <FiltroBusca pesquisa={handlePesquisa} />
      <div className="card-group">
        {/* Condição para exibir a lista filtrada ou a lista completa */}
        {(filtraAnimes.length > 0 ? filtraAnimes : animes).map((anime) => (
          <div key={anime.id} onClick={() => animeClick(anime)}>
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
      {animeClicado && (
        <AnimeDetalhes
          showModal={showModal}
          fecharModal={fecharModal}
          titulo={animeClicado.titulo}
        >
          <div className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={animeClicado.poster}
                  alt={`poster do anime ${animeClicado.titulo}`}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text">{animeClicado.descricao}</p>
                  <ul className="list-group list-group-flush">
                    <li class="list-group-item">
                      {animeClicado.genero.map((genero, index) => (
                        <span className="genero" key={index}>
                          {genero}
                        </span>
                      ))}
                    </li>
                    <li class="list-group-item">{animeClicado.ano}</li>
                    <li class="list-group-item">{animeClicado.temporadas}</li>
                    <li class="list-group-item">
                      Classificação indicativa: {animeClicado.classificacao}
                    </li>
                  </ul>
                  <div className="player">
                    <ReactPlayer url={animeClicado.trailer} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimeDetalhes>
      )}
    </>
  );
};

export default AnimeLista;
