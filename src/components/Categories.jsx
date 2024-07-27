function CatCard({ img, text }) {
  return (
    <div className="categories-card">
      <img src={img} alt="phone"></img>
      <div className="categories-card__text">{text}</div>
    </div>
  );
}

export default CatCard;
