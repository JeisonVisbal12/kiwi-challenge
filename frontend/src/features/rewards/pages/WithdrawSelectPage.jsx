import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchBalance } from "../api/rewardsApi";
import InfoCard from "../components/InfoCard";
import MethodCard from "../components/MethodCard";
import BackButton from "../components/BackButton";
import "../../../App.css";
import vectorIcon from "../../../assets/vector.svg";
import selectArrowIcon from "../../../assets/selectArrow.svg";

function WithdrawSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod ?? null;
  const balanceQuery = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  });
  const initialAmount =
    location.state?.amount ?? balanceQuery.data?.amount ?? 0;
  const [amount, setAmount] = useState(initialAmount);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  const maxAmount = balanceQuery.data?.amount ?? 0;

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (Number.isNaN(value)) {
      setAmount(0);
      return;
    }
    setAmount(value);
  };

  const isValid = amount > 0 && amount <= maxAmount;

  return (
    <div className="page">
      <div className="top-bar">
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <h2 className="section-title" style={{ marginBottom: 4 }}>
        Elige tu método de retiro
      </h2>
      <div className="muted-text" style={{ marginTop: -8 }}>
        Monto total a retirar
      </div>
      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={handleAmountChange}
        style={{
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "Poppins, sans-serif",
          border: "none",
          background: "transparent",
          outline: "none",
          width: "100%",
        }}
      />
      <div className="muted-text" style={{ marginTop: -6 }}>
        Máx disponible: ${maxAmount.toFixed(2)}
      </div>

      <div className="muted-text" style={{ marginTop: 12 }}>
        Selecciona tu método de retiro
      </div>
      <MethodCard
        label={selectedMethod ? selectedMethod.label : "Seleccionar"}
        leadingIconSrc={vectorIcon}
        trailingIconSrc={selectArrowIcon}
        onClick={() => navigate("/withdraw/methods", { state: { selectedMethod, amount } })}
      />

      <div className="bottom-info">
        <InfoCard description="**Debes esperar unos minutos** antes de realizar otro retiro con el mismo monto." />
      </div>

      {error && <div style={{ color: "#ef4444", fontSize: 14 }}>{error}</div>}

      <button
        className="primary-btn bottom-cta"
        disabled={!selectedMethod || !isValid}
        onClick={() => {
          if (!isValid) {
            setError("Ingresa un monto válido");
            return;
          }
          setError(null);
          navigate("/withdraw/confirm", { state: { selectedMethod, amount } });
        }}
      >
        Retirar fondos
      </button>
    </div>
  );
}

export default WithdrawSelectPage;
