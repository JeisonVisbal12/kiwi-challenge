import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMethods } from "../api/rewardsApi";
import MethodCard from "../components/MethodCard";
import BackButton from "../components/BackButton";
import iconSrc from "../../../assets/Icon.svg";
import "../../../App.css";

function WithdrawMethodsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = location.state?.selectedMethod ?? null;
  const amount = location.state?.amount ?? null;

  const { data: methods = [] } = useQuery({
    queryKey: ["methods"],
    queryFn: fetchMethods,
  });

  const handleSelect = (method) => {
    navigate("/withdraw", { state: { selectedMethod: method, amount } });
  };

  return (
    <div className="page">
      <div className="top-bar">
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <h2 className="section-title">Elige tu método de retiro</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {methods.map((method) => (
          <MethodCard
            key={method.id}
            label={method.label}
            iconSrc={iconSrc}
            selected={selected?.id === method.id}
            onClick={() => handleSelect(method)}
          />
        ))}
      </div>

      <button
        className="primary-btn"
        style={{ alignSelf: "end" }}
        disabled={!selected || !amount || amount <= 0}
        onClick={() =>
          navigate("/withdraw/confirm", {
            state: { selectedMethod: selected, amount },
          })
        }
      >
        Continuar
      </button>
    </div>
  );
}

export default WithdrawMethodsPage;
