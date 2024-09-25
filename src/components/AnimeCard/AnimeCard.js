import "./AnimeCard.css";

const AnimeCard = ({ anime }) => {
  return (
    <div className="card animeCard">
      <img
        className="card-img-top img-fluid"
        src={anime.poster}
        alt={`poster do anime ${anime.titulo}`}
      />
      <div className="card-body">
        <h5 className="card-title">{anime.titulo}</h5>
        <p className="card-text">{anime.ano}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
