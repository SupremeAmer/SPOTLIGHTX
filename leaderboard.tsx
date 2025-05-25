import React from "react";

// Example data for leaderboard
const myMiningStreak = 26;
const leaderboard = [
  {
    rank: 1,
    name: "Qubit Network",
    date: "2023-12-14",
    streak: 27,
    avatar: "/avatar-gold.png", // Placeholder avatar
  },
  {
    rank: 2,
    name: "Sumit Pal",
    date: "2023-12-15",
    streak: 4,
    avatar: "/avatar-silver.png",
  },
  {
    rank: 3,
    name: "Banktesh",
    date: "2023-12-15",
    streak: 3,
    avatar: "/avatar-bronze.png",
  },
  {
    rank: 4,
    name: "user237",
    date: "2024-02-04",
    streak: 1,
    avatar: "/avatar-default.png",
  },
  {
    rank: 5,
    name: "user493",
    date: "2024-02-04",
    streak: 1,
    avatar: "/avatar-default.png",
  },
];

export const Leaderboard: React.FC = () => {
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
          Leaderboard
        </h2>
      </div>

      {/* My mining streak */}
      <div style={{ margin: "30px 0 18px 0", textAlign: "center" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 100,
            padding: 16,
            margin: "0 auto",
            width: 230,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 2px 8px #8d4cff66",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {myMiningStreak}
            <span role="img" aria-label="flame" style={{ fontSize: 32 }}>
              🔥
            </span>
          </div>
          <div
            style={{
              marginTop: 3,
              color: "#fff",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            My Mining Streak
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#fff",
          padding: "8px 14px 4px 14px",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        <span>Rank</span>
        <span style={{ flex: 1, textAlign: "left", marginLeft: 22 }}>
          {/* Empty for spacing */}
        </span>
        <span>Streak Score</span>
      </div>

      {/* Leaderboard List */}
      <div>
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f7f5ff",
              borderRadius: 14,
              margin: "9px 0",
              padding: "8px 12px",
              boxShadow: "0 2px 8px #e3d3ff22",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: "#8d4cff",
                fontSize: 22,
                width: 28,
                textAlign: "center",
              }}
            >
              {entry.rank}
            </span>
            <img
              src={entry.avatar}
              alt={entry.name}
              width={48}
              height={48}
              style={{
                borderRadius: "50%",
                margin: "0 12px",
                border: "2px solid #eee",
                objectFit: "cover",
              }}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "/avatar-default.png";
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#444",
                  lineHeight: "1.1",
                }}
              >
                {entry.name}
              </div>
              <div style={{ color: "#8d4cff", fontSize: 14 }}>
                {entry.date}
              </div>
            </div>
            <div
              style={{
                fontWeight: 700,
                color: "#8d4cff",
                fontSize: 19,
                minWidth: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 3,
              }}
            >
              {entry.streak}
              <span role="img" aria-label="flame">
                🔥
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
