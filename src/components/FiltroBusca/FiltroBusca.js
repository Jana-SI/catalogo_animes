import { useState } from 'react';
import './FiltroBusca.css';

const FiltroBusca = ({ pesquisa }) => {

    const [pesquisaTermo, setPesquisaTermo] = useState('');
    const [selecionadoGenero, setSelecionadoGenero] = useState('');

    const handleChangePesquisa = (event) => {
        const termo = event.target.value;
        setPesquisaTermo(termo);
        pesquisa(termo, selecionadoGenero);
    }

    const handleChangeGenero = (event) => {
        const genero = event.target.value;
        setSelecionadoGenero(genero);
        pesquisa(pesquisaTermo, genero);
    }

    return (
        <div>
            <input type='text' placeholder='Pesquisar por título e/ou genêro' value={pesquisaTermo} onChange={handleChangePesquisa}/>
            <select value={selecionadoGenero} onChange={handleChangeGenero}>
            <option value="">Todos os gêneros</option>
                <option value="Ação">Ação</option>
                <option value="Aventura">Aventura</option>
                <option value="Drama">Drama</option>
                <option value="Comédia">Comédia</option>
                <option value="Shounen">Shounen</option>
            </select>
        </div>
    )
}

export default FiltroBusca;