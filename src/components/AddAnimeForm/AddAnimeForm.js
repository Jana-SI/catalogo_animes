import Button from "../Button/Button.js"; 
import Input from "../Input/Input"; 
import "./AddAnimeForm.css";
import { useState, useEffect } from "react"; 
import "./AddAnimeForm.css";

// Adiciona um novo anime
const AddAnimeForm = ({ getAnimes, fecharModal }) => {
  const [animeForm, setAnimeForm] = useState({
    titulo: "",
    descricao: "",
    poster: "",
    genero: [],
    ano: "",
    temporadas_filmes: "",
    classificacao: "",
    trailer: "",
  });

  const [ultimoId, setUltimoId] = useState(null);

  // Função para validar se a imagem é carregável
  const validarImagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true); 
      img.onerror = () => resolve(false); 
    });
  };

  // Rota GET da API do localhost para pegar o último anime adicionado
  const buscarUltimoId = () => {
    return fetch("http://localhost:3005/Animes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const ids = data.map((anime) => parseInt(anime.id)); // Converte os IDs para inteiros
        const maxId = Math.max(...ids); 
        setUltimoId(maxId); 
      });
  };

  // Busca o último ID quando o componente é montado
  useEffect(() => {
    buscarUltimoId();
  }, []);

  // Função para lidar com mudanças nos inputs do formulário
  const handleOnChange = (event) => {
    const { name, value } = event.target;

    // Validação campo 'ano'
    if (name === "ano") {
      if (!/^\d*$/.test(value) || value.length > 4) {
        return; 
      }
    }

    // Validação do campo 'classificacao'
    if (name === "classificacao") {   
      if (!/^\d*\+?$/.test(value) || value.length > 3) {
        return; // Permite números e '+' enquanto o usuário digita
      }
    }

    // Atualiza o estado do formulário com o novo valor
    setAnimeForm({
      ...animeForm,
      [name]: event.target.value,
    });
    console.log(animeForm); 
  };

  // Função para lidar com a seleção de gêneros
  const handleGeneroChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Adiciona o gênero se for marcado
      setAnimeForm((prev) => ({
        ...prev,
        genero: [...prev.genero, value],
      }));
    } else {
      // Remove o gênero se for desmarcado
      setAnimeForm((prev) => ({
        ...prev,
        genero: prev.genero.filter((g) => g !== value),
      }));
    }
  };

  // Função para lidar com o envio do formulário, impede o recarregamento da página até o usuário clicar no botão
  const handleSubmit = (event) => {
    event.preventDefault();

    // Valida se o link da imagem do poster é válido
    validarImagem(animeForm.poster).then((imagemValida) => {
      if (!imagemValida) {
        alert("A URL da imagem não é válida. Por favor, insira um link de imagem válido.");
        return;
      }

      // Valida título e gênero
      if (!animeForm.titulo || animeForm.genero.length === 0) {
        alert("Por favor, preencha o título e selecione pelo menos um gênero.");
        return;
      }

      const newAnime = {
        id: (ultimoId + 1).toString(), 
        ...animeForm,
      };

      // Consome rota POST da API local para adicionar anime
      fetch("http://localhost:3005/Animes", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newAnime), // Converte o objeto em string JSON
      })
        .then((response) => response.json())
        .then((data) => {
          alert(`O Anime ${data.titulo} Cadastrado com sucesso`); 
          fecharModal(); 
          getAnimes();
          setAnimeForm({
            titulo: "",
            descricao: "",
            poster: "",
            genero: [],
            ano: "",
            temporadas_filmes: "",
            classificacao: "",
            trailer: "",
          });
        });
    });
  };

  return (
    <div className="animeForm">
      <form className="form-floating" onSubmit={handleSubmit}> {/* Formulário para adicionar um novo anime */}
        <div className="row align-items-center">
          <div className="col-12">
            {/* Campo de título */}
            <div className="form-floating mb-3">
              <Input
                type="text"
                name="titulo"
                value={animeForm.titulo}
                onChange={handleOnChange} 
                label="Título"
              />
            </div>
          </div>
          <div className="col-12">
            {/* Campo de descrição */}
            <div className="form-floating mb-3">
              <Input
                type="textarea"
                name="descricao"
                value={animeForm.descricao}
                onChange={handleOnChange} 
                label="Descrição"
              />
            </div>
          </div>
          <div className="col-6">
            {/* Campo de poster */}
            <div className="form-floating mb-3">
              <Input
                type="url"
                name="poster"
                value={animeForm.poster}
                onChange={handleOnChange} 
                label="Poster"
              />
            </div>
          </div>
          <div className="col-6">
            {/* Campo de trailer */}
            <div className="form-floating mb-3">
              <Input
                type="url"
                name="trailer"
                value={animeForm.trailer}
                onChange={handleOnChange} 
                label="Trailer"
              />
            </div>
          </div>
          <div className="col-6">
            {/* Checkboxes de gêneros */}
            <div className="form-floating mb-3">
              <p className="form-label">Gênero</p>
              {[
                "Ação",
                "Aventura",
                "Comédia",
                "Drama",
                "Fantasia",
                "Ficção Científica",
                "Esportes",
                "Musica",
                "Romance",
                "Seinen",
                "Shoujo",
                "Shounen",
                "Slice-of-Life",
                "Sobrenatural",
                "Suspense",
              ].map((nomeGenero) => (
                <div
                  className="form-check form-switch form-check-inline" 
                  key={nomeGenero}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="genero"
                    value={nomeGenero}
                    checked={animeForm.genero.includes(nomeGenero)} // Verifica se o gênero está no estado
                    onChange={handleGeneroChange} 
                    role="switch" // Define o papel como switch para acessibilidade
                    id="genero" 
                  />
                  <label className="form-check-label" htmlFor="genero">
                    {nomeGenero} 
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 col-md-6">
                {/* Campo de ano */}
                <div className="form-floating mb-3">
                  <Input
                    type="text"
                    name="ano"
                    value={animeForm.ano}
                    onChange={handleOnChange} 
                    label="Ano de lançamento"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                {/* Campo de classificação */}
                <div className="form-floating mb-3">
                  <Input
                    type="text"
                    name="classificacao"
                    value={animeForm.classificacao}
                    onChange={handleOnChange} 
                    label="Classificação"
                  />
                </div>
              </div>
              <div className="col-12">
                {/* Campo de temporadas/filme */}
                <div className="form-floating mb-3">
                  <Input
                    type="text"
                    name="temporadas_filmes"
                    value={animeForm.temporadas_filmes}
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    label="Temporadas e/ou filmes"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 text-end btnEnviar">
            <Button className="btn" type="submit">
              Enviar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAnimeForm;