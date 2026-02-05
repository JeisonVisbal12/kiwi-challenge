import outIcon from "../../../assets/OutTransaction.svg";
import cashbackIcon from "../../../assets/Cashback.svg";
import bonusIcon from "../../../assets/Bonus.svg";

const typeIcon = {
  withdrawal: outIcon,
  cashback: cashbackIcon,
  referral: bonusIcon,
};

function TransactionItem({ title, dateLabel, amount, type }) {
  const isPositive = amount > 0;
  const formatted = `${isPositive ? "+" : "-"}$${Math.abs(amount).toFixed(2)}`;
  const icon = typeIcon[type] ?? outIcon;

  return (
    <div className="transaction-item">
      <div className="transaction-left">
        <div className="icon-circle" style={{ background: "#eef2ff" }}>
          <img src={icon} alt={type} style={{ width: 18, height: 18 }} />
        </div>
        <div>
          <p className="transaction-title">{title}</p>
          <p className="transaction-date">{dateLabel}</p>
        </div>
      </div>
      <div className={isPositive ? "amount-positive" : "amount-negative"}>
        {formatted}
      </div>
    </div>
  );
}

export default TransactionItem;
