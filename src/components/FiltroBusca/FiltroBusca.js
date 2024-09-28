import { useState } from "react";
import AddAnimeForm from "../AddAnimeForm/AddAnimeForm"; 
import AnimeDetalhes from "../AnimeDetalhes/AnimeDetalhes"; 
import Button from "../Button/Button"; 
import "./FiltroBusca.css";

const FiltroBusca = ({ pesquisa, ...props }) => {
  // Define estados para armazenar os termos de pesquisa, de gênero selecionado, de exibição e conteúdo do modal
  const [pesquisaTermo, setPesquisaTermo] = useState("");
  const [selecionadoGenero, setSelecionadoGenero] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const [modalContent, setModalContent] = useState(null);

  // Função para atualizar o termo de pesquisa
  const handleChangePesquisa = (event) => {
    const termo = event.target.value;
    setPesquisaTermo(termo); 
    pesquisa(termo, selecionadoGenero);
  };

  // Função para atualizar o gênero selecionado
  const handleChangeGenero = (event) => {
    const genero = event.target.value;
    setSelecionadoGenero(genero); 
    pesquisa(pesquisaTermo, genero); 
  };

  // Função chamada ao clicar no botão de adicionar anime
  const handleAddAnimeClick = () => {
    setModalContent('form'); 
    setShowModal(true); 
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="filtroBusca">
      <div className="input-group">
        {/* Campo de entrada para pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar por título e/ou gênero"
          value={pesquisaTermo} 
          onChange={handleChangePesquisa} 
          className="form-control"
        />
        {/* Selecionador para escolher o gênero */}
        <select
          value={selecionadoGenero}
          onChange={handleChangeGenero} 
          className="form-select"
        >
          {/* Opções de gêneros */}
          <option value="" selected>Gêneros</option> 
          <option value="Ação">Ação</option>
          <option value="Aventura">Aventura</option>
          <option value="Comédia">Comédia</option>
          <option value="Drama">Drama</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Ficção Científica">Ficção Científica</option>
          <option value="Esportes">Esportes</option>
          <option value="Musica">Musica</option>
          <option value="Romance">Romance</option>
          <option value="Seinen">Seinen</option>
          <option value="Shoujo">Shoujo</option>
          <option value="Shounen">Shounen</option>
          <option value="Slice-of-Life">Slice-of-Life</option>
          <option value="Sobrenatural">Sobrenatural</option>
          <option value="Suspense">Suspense</option>
        </select>
        
        
        <Button className="btn" onClick={handleAddAnimeClick}>
          Adicionar Anime
        </Button>

        {/* Renderiza o modal se showModal for verdadeiro */}
        {showModal && (
          <AnimeDetalhes
            showModal={showModal} 
            fecharModal={handleCloseModal} 
            titulo={modalContent === 'form' ? "Adicionar Anime" : "Detalhes do Anime"} 
            textButton={modalContent === 'form' ? "Enviar" : "Deletar"} 
            onDelete={modalContent === 'details' ? props.onDelete : undefined} 
          >
            {modalContent === 'form' ? (
              // Renderiza o formulário de adição de anime
              <AddAnimeForm getAnimes={props.getAnimes} fecharModal={handleCloseModal} />
            ) : (
              <div>Conteúdo dos detalhes do anime aqui</div>
            )}
          </AnimeDetalhes>
        )}
      </div>
    </div>
  );
};

export default FiltroBusca;