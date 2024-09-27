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
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    getAnimes();
  }, []);

  const getAnimes = async () => {
    const response = await fetch("http://localhost:3005/Animes");

    const data = await response.json();

    setAnimes(data);
    setFiltraAnimes(data);
    if (data.length === 0) {
      setMensagem("Nenhum anime encontrado no catálogo."); // Define a mensagem se o banco estiver vazio
    } else {
      setMensagem(""); // Limpa a mensagem se houver animes
    }
  };

  const animeClick = (anime) => {
    // Atualiza o estado com o anime selecionado
    setAnimeClicado(anime);
    setShowModal(true);
  };

  const exibirForm = () => setShowModal(true);
  const fecharModal = () => setShowModal(false);

  const handlePesquisa = (pesquisaTermo, selecionadoGenero) => {
    const filtrado = animes.filter((anime) => {
      const tituloCorrespondente = anime.titulo
        .toLowerCase()
        .includes(pesquisaTermo.toLowerCase());

      // Verifica se o gênero selecionado está incluído no array de gêneros do anime
      const generoCorrespondente = selecionadoGenero
        ? anime.genero.includes(selecionadoGenero) // Verifica se o gênero do anime inclui o gênero selecionado
        : true; // Se nenhum gênero estiver selecionado, retorna true

      return tituloCorrespondente && generoCorrespondente;
    });

    setFiltraAnimes(filtrado);

    if (filtrado.length === 0) {
      setMensagem("Nenhum anime encontrado.");
    } else {
      setMensagem("");
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <FiltroBusca pesquisa={handlePesquisa} onClick={exibirForm} showModal={showModal} exibir={exibirForm} fechar={fecharModal} getAnimes={getAnimes}/>
      </div> 
      <div className="col-12">
        <div className="d-flex justify-content-center flex-wrap">
          {filtraAnimes.length > 0 ? (
            filtraAnimes.sort((a, b) => a.titulo.localeCompare(b.titulo)).map((anime) => (
              <div key={anime.id} onClick={() => animeClick(anime)}>
                <AnimeCard anime={anime} />
              </div>
            ))
          ) : (
            <p>{mensagem}</p> // Exibe a mensagem se não houver animes filtrados
          )}
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
                      <li class="list-group-item">Ano de lançamento: {animeClicado.ano}</li>
                      <li class="list-group-item">Temporadas/Filmes: {animeClicado.temporadas}</li>
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
      </div>
    </div>
  );
};

export default AnimeLista;
