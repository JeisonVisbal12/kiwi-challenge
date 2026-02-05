import warningIcon from "../../../assets/warning.svg";

function InfoCard({ title, description }) {
  return (
    <div className="inline-note">
      <div
        className="icon-circle"
        style={{ width: 32, height: 28, background: "#ffffff" }}
      >
        <img src={warningIcon} alt="Aviso" style={{ width: 32, height: 25 }} />
      </div>
      <div>
        <div style={{ fontSize: 13, color: "#4b5563" }}>{description}</div>
      </div>
    </div>
  );
}

export default InfoCard;
