import Button from "../Button/Button";
import Input from "../Input/Input";
import "./AddAnimeForm.css";
import { useState, useEffect } from "react";

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

  const validarImagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true); // A imagem carregou com sucesso
      img.onerror = () => resolve(false); // Erro ao carregar a imagem
    });
  };

  const buscarUltimoId = () => {
    return fetch("http://localhost:3005/Animes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const ids = data.map((anime) => parseInt(anime.id));
        const maxId = Math.max(...ids);
        setUltimoId(maxId);
      });
  };

  useEffect(() => {
    buscarUltimoId();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    // Lógica de validação específica para o campo 'ano'
    if (name === "ano") {
      if (!/^\d*$/.test(value) || value.length > 4) {
        return; // Permitir apenas números e limitar a 4 dígitos
      }
    }

    // Lógica de validação para o campo 'classificacao'
    if (name === "classificacao") {
      // Permitir a digitação enquanto o valor está incompleto
      if (!/^\d*\+?$/.test(value) || value.length > 3) {
        return; // Permite números e '+' enquanto o usuário digita
      }
    }

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
      setAnimeForm((prev) => ({
        ...prev,
        genero: [...prev.genero, value], // Adiciona o gênero se for marcado
      }));
    } else {
      setAnimeForm((prev) => ({
        ...prev,
        genero: prev.genero.filter((g) => g !== value), // Remove o gênero se for desmarcado
      }));
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // Valida se o link da imagem (poster) é válido
    validarImagem(animeForm.poster).then((imagemValida) => {
      if (!imagemValida) {
        alert("A URL da imagem não é válida. Por favor, insira um link de imagem válido.");
        return;
      }

      // Verifica se o título e pelo menos um gênero estão preenchidos
      if (!animeForm.titulo || animeForm.genero.length === 0) {
        alert("Por favor, preencha o título e selecione pelo menos um gênero.");
        return;
      }

      const newAnime = {
        id: (ultimoId + 1).toString(), // Incrementa o ID a partir do último
        ...animeForm,
      };

      fetch("http://localhost:3005/Animes", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newAnime),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(`O Anime ${data.titulo} Cadastrado com sucesso`);
          fecharModal(); // Chama a função para fechar o modal após o envio
          getAnimes(); // Atualiza a lista de animes
          // Resetando o formulário após o envio
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
      <form className="form-floating" onSubmit={handleSubmit}>
        <div className="row align-items-center">
          <div className="col-12">
            {/* Campo de título */}
            <div className="form-floating mb-3">
              <Input
                type="text"
                name="titulo"
                value={animeForm.titulo}
                onChange={(event) => {
                  handleOnChange(event);
                }}
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
                onChange={(event) => {
                  handleOnChange(event);
                }}
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
                onChange={(event) => {
                  handleOnChange(event);
                }}
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
                onChange={(event) => {
                  handleOnChange(event);
                }}
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
              ].map((g) => (
                <div
                  className="form-check form-switch form-check-inline"
                  key={g}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="genero"
                    value={g}
                    checked={animeForm.genero.includes(g)} // Verifica se o gênero está no estado
                    onChange={handleGeneroChange}
                    role="switch"
                    id="genero"
                  />
                  <label className="form-check-label" htmlFor="genero">
                    {g}
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
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
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
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    label="Classificação indicativa"
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