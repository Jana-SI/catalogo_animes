import { useState } from "react";
import AddAnimeForm from "../AddAnimeForm/AddAnimeForm";
import AnimeDetalhes from "../AnimeDetalhes/AnimeDetalhes";
import "./FiltroBusca.css";
import Button from "../Button/Button";

const FiltroBusca = ({ pesquisa, ...props }) => {
  const [pesquisaTermo, setPesquisaTermo] = useState("");
  const [selecionadoGenero, setSelecionadoGenero] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleChangePesquisa = (event) => {
    const termo = event.target.value;
    setPesquisaTermo(termo);
    pesquisa(termo, selecionadoGenero);
  };

  const handleChangeGenero = (event) => {
    const genero = event.target.value;
    setSelecionadoGenero(genero);
    pesquisa(pesquisaTermo, genero);
  };

  const handleAddAnimeClick = () => {
    setModalContent('form'); // Define que o conteúdo do modal é o formulário
    setShowModal(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fecha o modal
  };

  return (
    <div className="filtroBusca">
      <div className="input-group">
        <input
          type="text"
          placeholder="Pesquisar por título e/ou genêro"
          value={pesquisaTermo}
          onChange={handleChangePesquisa}
          className="form-control"
        />
        <select
          value={selecionadoGenero}
          onChange={handleChangeGenero}
          className="form-select"
        >
          <option value="" selected>
            Gêneros
          </option>
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
        <Button className="btn"onClick={handleAddAnimeClick}>
        Adicionar Anime
          </Button>

          {showModal && (
          <AnimeDetalhes
            showModal={showModal}
            fecharModal={handleCloseModal}
            titulo={modalContent === 'form' ? "Adicionar Anime" : "Detalhes do Anime"}
            textButton={modalContent === 'form' ? "Enviar" : "Deletar"}
            onDelete={modalContent === 'details' ? props.onDelete : undefined}
          >
            {modalContent === 'form' ? (
              <AddAnimeForm getAnimes={props.getAnimes} fecharModal={handleCloseModal} />
            ) : (
              // Aqui você pode renderizar o conteúdo dos detalhes do anime, se necessário
              <div>Conteúdo dos detalhes do anime aqui</div>
            )}
          </AnimeDetalhes>
        )}
      </div>
    </div>
  );
};

export default FiltroBusca;
