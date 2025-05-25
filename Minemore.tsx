import React, { useState } from "react";

// Example milestones
const milestones = [
  { days: 10, reward: 50 },
  { days: 20, reward: 100 },
  { days: 30, reward: 150 },
  { days: 50, reward: 200 },
  { days: 80, reward: 250 },
];

// Placeholder for mining icon
const miningIcon = "/mine-icon.png"; // Use an appropriate icon path or SVG

export const MineMorePage: React.FC<{ minedDays: number; claimed: number[] }> = ({
  minedDays = 164,
  claimed = [10, 20, 30, 50, 80], // Example: all claimed
}) => {
  // Local state for claimed milestones (simulate claim)
  const [claimedDays, setClaimedDays] = useState<number[]>(claimed);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        background: "linear-gradient(180deg, #a48aff 0%, #e3d3ff 100%)",
        borderRadius: 32,
        boxShadow: "0 0 24px #b3a6ff88",
        padding: 24,
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: 600,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <button
          style={{
            background: "#fff",
            border: "none",
            borderRadius: 16,
            width: 38,
            height: 38,
            fontSize: 22,
            marginRight: 12,
            cursor: "pointer",
          }}
          onClick={() => window.history.back()}
        >
          ←
        </button>
        <h2 style={{ flex: 1, textAlign: "center", color: "#fff", margin: 0 }}>
          Mine More
        </h2>
      </div>

      {/* Mine More & Earn More Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 18,
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <img
            src={miningIcon}
            alt="Mining"
            width={40}
            height={40}
            style={{ marginTop: 2 }}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src =
                "https://img.icons8.com/fluency/48/mining-cart.png";
            }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#222" }}>
              Mine More & Earn More
            </div>
            <div style={{ fontSize: 15, color: "#666" }}>
              Mine for numbers of days and collect your bonus coins here!
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 12,
            fontWeight: 600,
            fontSize: 17,
            color: "#666",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          Your Mined Days :{" "}
          <span
            style={{
              background: "#a48aff",
              color: "#fff",
              borderRadius: 12,
              padding: "5px 18px",
              marginLeft: 10,
              fontSize: 18,
            }}
          >
            {minedDays} Days
          </span>
        </div>
      </div>

      {/* Milestone Rewards List */}
      <div>
        {milestones.map((m) => {
          const isClaimed = claimedDays.includes(m.days);
          return (
            <div
              key={m.days}
              style={{
                background: "#f7f5ff",
                borderRadius: 16,
                padding: "14px 18px",
                margin: "12px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px #e3d3ff22",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src={miningIcon}
                  alt="Mining"
                  width={36}
                  height={36}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://img.icons8.com/fluency/48/mining-cart.png";
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#222",
                      fontSize: 16,
                    }}
                  >
                    Mine Below Days
                  </div>
                  <div style={{ color: "#8d4cff", fontWeight: 600 }}>
                    {m.days} Days
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    background: "none",
                    color: "#a48aff",
                    fontWeight: 700,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span role="img" aria-label="bonus">
                    🪙
                  </span>
                  {m.reward}
                </div>
                <button
                  disabled={isClaimed || minedDays < m.days}
                  style={{
                    marginTop: 6,
                    background: isClaimed
                      ? "#e0e0e0"
                      : minedDays >= m.days
                      ? "#a48aff"
                      : "#ccc",
                    color: isClaimed ? "#aaa" : "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 18px",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor:
                      isClaimed || minedDays < m.days
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => {
                    if (!isClaimed && minedDays >= m.days) {
                      setClaimedDays((c) => [...c, m.days]);
                      alert(
                        `You have claimed ${m.reward} bonus coins for ${m.days} days!`
                      );
                    }
                  }}
                >
                  {isClaimed
                    ? "Claimed"
                    : minedDays >= m.days
                    ? "Claim"
                    : "Locked"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MineMorePage;
