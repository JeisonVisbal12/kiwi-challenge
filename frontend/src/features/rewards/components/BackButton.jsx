import backArrow from "../../../assets/backArrow.svg";

function BackButton({ onClick }) {
  return (
    <button className="back-button" onClick={onClick} aria-label="Volver">
      <img src={backArrow} alt="Volver" style={{ width: 20, height: 20 }} />
    </button>
  );
}

export default BackButton;
