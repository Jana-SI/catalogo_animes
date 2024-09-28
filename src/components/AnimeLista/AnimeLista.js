import AnimeCard from "../AnimeCard/AnimeCard"; 
import AnimeDetalhes from "../AnimeDetalhes/AnimeDetalhes"; 
import Button from "../Button/Button"; 
import FiltroBusca from "../FiltroBusca/FiltroBusca"; 
import "./AnimeLista.css"; 
import { useEffect, useState } from "react"; 
import ReactPlayer from "react-player"; 

const AnimeLista = () => {
  // Estados para armazenar a lista de animes, para o anime selecionado, para controle da exibição do modal,
  // para animes filtrados e para mensagens ao usuário.
  const [animes, setAnimes] = useState([]); 
  const [animeClicado, setAnimeClicado] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [filtraAnimes, setFiltraAnimes] = useState([]); 
  const [mensagem, setMensagem] = useState(""); 

  useEffect(() => {
    getAnimes();
  }, []);

  const getAnimes = async () => {
    // Função para buscar animes da API no proprio localhost, utilizando promisse
    const fetchAnimes = new Promise((resolve, reject) => {
      fetch("http://localhost:3005/Animes") 
        .then(response => {
          if (!response.ok) {
            reject("Erro ao buscar animes"); 
          }
          return response.json(); 
        })
        .then(data => resolve(data)) 
        .catch(error => reject(error));
    });

    try {
      const data = await fetchAnimes; 
      setAnimes(data); // Atualiza o estado com os animes obtidos
      setFiltraAnimes(data); // Define os animes filtrados inicialmente

      if (data.length === 0) {
        setMensagem("Nenhum anime encontrado no catálogo."); 
      } else {
        setMensagem(""); 
      }
    } catch (error) {
      console.error("Erro ao buscar animes:", error); 
      setMensagem("Erro ao carregar animes."); 
    }
  };

  const animeClick = (anime) => {
    // Define anime selecionado e abre seu modal ao clicar em um anime
    setAnimeClicado(anime); 
    setShowModal(true); 
  };

  const exibirForm = () => setShowModal(true); 
  const fecharModal = () => setShowModal(false); 

  const handlePesquisa = (pesquisaTermo, selecionadoGenero) => {
    // Função para filtrar animes com base no termo de pesquisa e gênero selecionado
    const filtrado = animes.filter((anime) => {
      const tituloCorrespondente = anime.titulo
        .toLowerCase()
        .includes(pesquisaTermo.toLowerCase()); 

      const generoCorrespondente = selecionadoGenero
        ? anime.genero.includes(selecionadoGenero) 
        : true; 

      return tituloCorrespondente && generoCorrespondente; 
    });

    setFiltraAnimes(filtrado); 

    if (filtrado.length === 0) {
      setMensagem("Nenhum anime encontrado."); 
    } else {
      setMensagem("");
    }
  };

  const deleteAnime = async (id, titulo) => {
    // Rota DELETE de um anime, consome API do próprio localhost
    const deleteRequest = new Promise((resolve, reject) => {
      fetch(`http://localhost:3005/Animes/${id}`, {
        method: 'DELETE' // Método DELETE para remover o anime
      })
        .then(response => {
          if (response.ok) {
            resolve(); // Resolve se a resposta for ok
          } else {
            reject("Erro ao deletar o anime"); // Reject em caso de erro
          }
        })
        .catch(error => reject(error)); // Reject em caso de erro no fetch
    });

    try {
      await deleteRequest; // Consome a Promise com await
      alert(`O Anime ${titulo} foi deletado com sucesso`); // Alerta de sucesso ao usuário
      getAnimes(); // Atualiza a lista de animes
      fecharModal(); // Fecha o modal
    } catch (error) {
      alert(`Erro ao deletar o anime ${titulo}: ${error}`); // Mensagem de erro ao usuário
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        {/* Componente de filtro e busca */}
        <FiltroBusca pesquisa={handlePesquisa} onClick={exibirForm} showModal={showModal} exibir={exibirForm} fechar={fecharModal} getAnimes={getAnimes}/>
      </div> 
      <div className="col-12">
        <div className="d-flex justify-content-center flex-wrap">
          {filtraAnimes.length > 0 ? (
            // Renderiza os animes filtrados em cards
            filtraAnimes.sort((a, b) => a.titulo.localeCompare(b.titulo)).map((anime) => (
              <div key={anime.id} onClick={() => animeClick(anime)}>
                <AnimeCard anime={anime} /> {/* Componente que exibe as informações do anime */}
              </div>
            ))
          ) : (
            <p>{mensagem}</p> // Exibe a mensagem se não houver animes filtrados
          )}
        </div>
        {animeClicado && (
          //Modal de informações do anime
          <AnimeDetalhes
            showModal={showModal} 
            fecharModal={fecharModal} 
            titulo={animeClicado.titulo} 
            id={animeClicado.id} 
            textButton="Deletar" 
            onDelete={() => deleteAnime(animeClicado.id, animeClicado.titulo)}
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
                      <li className="list-group-item">
                        {animeClicado.genero.map((genero, index) => (
                          <span className="genero" key={index}>
                            {genero} {/* Renderiza cada gênero do anime */}
                          </span>
                        ))}
                      </li>
                      <li className="list-group-item">Ano de lançamento: {animeClicado.ano}</li>
                      <li className="list-group-item">Temporadas/Filmes: {animeClicado.temporadas_filmes}</li>
                      <li className="list-group-item">
                        Classificação indicativa: {animeClicado.classificacao} 
                      </li>
                    </ul>
                    <div className="player">
                      <ReactPlayer url={animeClicado.trailer} /> 
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card-footer text-end">
                    <Button className="btn btn-danger" onClick={() => deleteAnime(animeClicado.id, animeClicado.titulo)}>Deletar</Button>
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