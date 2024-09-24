import "./AnimeCard.css";

const AnimeCard = ({ anime }) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={anime.poster}
        alt={`poster do anime ${anime.titulo}`}
      />
      <div className="card-body">
        <h2 className="card-title">{anime.titulo}</h2>
        <p className="card-text">{anime.ano}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
