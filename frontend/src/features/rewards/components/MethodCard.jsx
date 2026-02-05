function MethodCard({
  label,
  icon,
  iconSrc,
  leadingIconSrc,
  trailingIconSrc,
  trailing,
  onClick,
  selected = false,
}) {
  return (
    <button
      className="method-card"
      onClick={onClick}
      style={{ background: "#fff", cursor: "pointer" }}
    >
      <div className="method-info">
        {leadingIconSrc || iconSrc ? (
          <img
            src={leadingIconSrc || iconSrc}
            alt="Método"
            style={{ width: 24, height: 24 }}
          />
        ) : (
          <span className="icon-circle" style={{ background: "#e0f2ff" }}>
            {iconSrc ?? icon}
          </span>
        )}
        <div>
          <div style={{ fontWeight: 400 }}>{label}</div>
        </div>
      </div>
      {trailing ?? (
        <span style={{ color: "#9ca3af" }}>
          {trailingIconSrc ? (
            <img src={trailingIconSrc} alt="Abrir" width={14} height={14} />
          ) : (
            selected ? "✓" : "›"
          )}
        </span>
      )}
    </button>
  );
}

export default MethodCard;
