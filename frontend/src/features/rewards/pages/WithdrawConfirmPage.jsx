import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InfoCard from "../components/InfoCard";
import MethodCard from "../components/MethodCard";
import BackButton from "../components/BackButton";
import { submitWithdraw } from "../api/rewardsApi";
import "../../../App.css";
import vectorIcon from "../../../assets/vector.svg";
import selectArrowIcon from "../../../assets/selectArrow.svg";

function WithdrawConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod;
  const amount = location.state?.amount ?? 0;
  const [toast, setToast] = useState(null);
  const queryClient = useQueryClient();

  if (!selectedMethod) {
    navigate("/withdraw");
    return null;
  }

  const mutation = useMutation({
    mutationFn: submitWithdraw,
    onSuccess: async () => {
      setToast({ type: "success", message: "Retiro enviado" });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["balance"] }),
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
      ]);
      navigate("/withdraw/success", { state: { amount, selectedMethod } });
    },
    onError: (err) => {
      setToast({ type: "error", message: err.message });
    },
    onSettled: () => {
      setTimeout(() => setToast(null), 2500);
    },
  });

  return (
    <div className="page">
      <div className="top-bar">
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <h2 className="section-title" style={{ marginBottom: 4 }}>
        Retirar tus fondos
      </h2>
      <div className="muted-text" style={{ marginTop: -8 }}>
        Monto total a retirar
      </div>
      <div className="balance-amount" style={{ fontSize: 48 }}>
        ${amount.toFixed(2)}
      </div>

      <div className="muted-text" style={{ marginTop: 12 }}>
        Selecciona tu método de retiro
      </div>
      <MethodCard
        label={selectedMethod.label}
        leadingIconSrc={vectorIcon}
        trailingIconSrc={selectArrowIcon}
        onClick={() => navigate("/withdraw/methods", { state: { selectedMethod, amount } })}
      />

      <div className="bottom-info">
        <InfoCard description="**Debes esperar unos minutos** antes de realizar otro retiro con el mismo monto." />
      </div>

      {toast && (
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            borderRadius: 10,
            background: toast.type === "error" ? "#fee2e2" : "#ecfdf3",
            color: toast.type === "error" ? "#b91c1c" : "#166534",
            fontSize: 14,
          }}
        >
          {toast.message}
        </div>
      )}

      <button
        className="primary-btn bottom-cta"
        onClick={() => mutation.mutate({ amount, methodId: selectedMethod.id })}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <span className="loader-ring" aria-label="Cargando" />
        ) : (
          "Retirar fondos"
        )}
      </button>
    </div>
  );
}

export default WithdrawConfirmPage;
