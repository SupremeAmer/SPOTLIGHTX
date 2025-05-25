import React, { useState } from "react";

// Example prizes for the spinning wheel
const prizes = [
  { label: "750", value: 750 },
  { label: "10K", value: 10000 },
  { label: "1K", value: 1000 },
  { label: "2M", value: 2000000 },
  { label: "25", value: 25 },
  { label: "25K", value: 25000 },
  { label: "3K", value: 3000 },
  { label: "7K", value: 7000 },
  { label: "250K", value: 250000 },
  { label: "25", value: 25 },
];

const getRandomIndex = () => Math.floor(Math.random() * prizes.length);

export const SpinningWheelGame: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [multiplier, setMultiplier] = useState<number>(1);

  // Simulate a spin
  const spin = () => {
    setSpinning(true);
    setResultText(null);
    setSelected(null);

    setTimeout(() => {
      const prizeIndex = getRandomIndex();
      setSelected(prizeIndex);

      const prizeValue = prizes[prizeIndex].value * multiplier;
      setResultText(
        `You won ${prizes[prizeIndex].label} SupremeAmer tokens x${multiplier} = ${prizeValue}!`
      );
      setSpinning(false);
    }, 2000);
  };

  // Handle multiplier logic similar to "25X Prize"
  const increaseMultiplier = () => setMultiplier(multiplier < 25 ? multiplier + 1 : 1);

  return (
    <div style={{ textAlign: "center", background: "linear-gradient(#b0e0ff, #e0d0ff)", minHeight: 500, padding: 24, borderRadius: 24 }}>
      <h2 style={{ color: "#8d4cff" }}>SupremeAmer Spinning Wheel</h2>
      <div style={{ marginBottom: 12 }}>
        <b style={{ fontSize: 20 }}>{multiplier}X PRIZE</b>
        <button onClick={increaseMultiplier} disabled={spinning} style={{
          marginLeft: 16,
          background: "#8d4cff",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "6px 14px",
          fontWeight: 600,
          fontSize: 16,
          cursor: spinning ? "not-allowed" : "pointer"
        }}>
          Change Multiplier
        </button>
      </div>
      <div style={{
        margin: "32px auto",
        width: 240,
        height: 240,
        borderRadius: "50%",
        border: "8px solid #444",
        position: "relative",
        background: "#fff"
      }}>
        {/* Wheel slices */}
        {prizes.map((prize, idx) => {
          const angle = (360 / prizes.length) * idx;
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translate(0, -100px)`,
                transformOrigin: "0 100%",
                width: 60,
                textAlign: "center",
                fontWeight: selected === idx ? "bold" : "normal",
                color: selected === idx ? "#FFD700" : "#8d4cff",
                fontSize: 20,
              }}>
              {prize.label}
            </div>
          );
        })}
        {/* Pointer */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-25px",
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "25px solid #8d4cff",
            marginLeft: -12,
            zIndex: 2,
          }}
        />
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        style={{
          padding: "18px 40px",
          fontSize: 24,
          background: "#6bff6b",
          border: "none",
          borderRadius: 12,
          marginTop: 16,
          cursor: spinning ? "not-allowed" : "pointer",
          fontWeight: 700
        }}>
        {spinning ? "SPINNING..." : `STOP (${multiplier * 1000} SupremeAmer)`}
      </button>
      <div style={{ marginTop: 32, fontSize: 26, color: "#3b3", fontWeight: 700 }}>{resultText}</div>
    </div>
  );
};
