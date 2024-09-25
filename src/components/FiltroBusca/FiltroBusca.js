import { useState } from "react";
import "./FiltroBusca.css";

const FiltroBusca = ({ pesquisa }) => {
  const [pesquisaTermo, setPesquisaTermo] = useState("");
  const [selecionadoGenero, setSelecionadoGenero] = useState("");

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
      </div>
    </div>
  );
};

export default FiltroBusca;
