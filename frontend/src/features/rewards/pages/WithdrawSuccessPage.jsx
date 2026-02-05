import { useLocation, useNavigate } from "react-router-dom";
import "../../../App.css";
import successImg from "../../../assets/Success.svg";
import InfoCard from "../components/InfoCard";
import BackButton from "../components/BackButton";

function WithdrawSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount ?? 0;
  const method = location.state?.selectedMethod;
  const days = location.state?.processingDays ?? 5;

  return (
    <div className="page" style={{ alignItems: "center", textAlign: "center" }}>
      <div className="top-bar" style={{ width: "100%" }}>
        <BackButton onClick={() => navigate("/")} />
      </div>
      <img
        src={successImg}
        alt="Éxito"
        style={{ width: 180, height: "auto", marginTop: "50%" }}
      />
      <h2 className="section-title" style={{ marginTop: 12 }}>
        ¡Tu retiro fue exitoso!
      </h2>
      <p className="muted-text" style={{ maxWidth: 320 }}>
        Procesamos tu solicitud y enviamos tu recompensa a tu cuenta bancaria
        terminada en {method?.label ?? "{number}"}.
      </p>

      <div className="bottom-info">
        <InfoCard
          description={
            "El pago puede tardar hasta " +
            days +
            " días hábiles en reflejarse en tu cuenta."
          }
        />
      </div>

      <button
        className="primary-btn bottom-cta"
        style={{}}
        onClick={() => navigate("/")}
      >
        Regresar a Rewards
      </button>
    </div>
  );
}

export default WithdrawSuccessPage;
