import React, { useState } from "react";
import { SpinningWheelGame } from "./SpinningWheelGame";

// Utility to simulate mining stats (in real app, fetch from backend)
const initialStats = {
  mined: 133374.246,
  days: 164,
  speed: 2.0,
  rank: "#-",
  bonus: 0,
  flame: 27,
};

const SupremeAmerDashboard: React.FC = () => {
  const [stats, setStats] = useState(initialStats);
  const [showWheel, setShowWheel] = useState(false);

  // Simulate collecting bonus
  const collectBonus = () => {
    setStats((s) => ({
      ...s,
      bonus: s.bonus + 50,
      mined: s.mined + 50,
    }));
    alert("You collected 50 bonus coins!");
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "0 auto",
      background: "linear-gradient(180deg, #a48aff 0%, #e3d3ff 100%)",
      borderRadius: 32,
      boxShadow: "0 0 24px #b3a6ff88",
      padding: 24,
      fontFamily: "Poppins, Arial, sans-serif"
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Spinning wheel icon for game */}
        <button
          onClick={() => setShowWheel(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
          title="Spin & Win"
        >
          <img src="/spinning-wheel-icon.png" alt="Wheel" width={40} />
        </button>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: "6px 18px",
          fontWeight: 600,
          color: "#8d4cff",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          {stats.flame} <span role="img" aria-label="flame">🔥</span>
        </div>
        <button
          style={{
            background: "#fff",
            borderRadius: "50%",
            border: "none",
            padding: 10,
            width: 38,
            height: 38
          }}
        >
          <span role="img" aria-label="bell">🔔</span>
        </button>
      </div>

      {/* Main Token Display */}
      <div style={{
        margin: "30px 0 12px 0",
        textAlign: "center"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.15)",
          borderRadius: 100,
          padding: 16,
          margin: "0 auto",
          width: 230,
          position: "relative"
        }}>
          <div style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#fff",
            textShadow: "0 2px 8px #8d4cff66"
          }}>
            {stats.mined.toLocaleString(undefined, {minimumFractionDigits: 3})}
          </div>
          <div style={{
            fontSize: 20,
            marginTop: 4,
            color: "#fff"
          }}>
            23 : 52 : 36
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        background: "#f7f5ff",
        borderRadius: 16,
        display: "flex",
        justifyContent: "space-between",
        padding: "18px 6px",
        margin: "20px 0"
      }}>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div><span role="img" aria-label="calendar">📅</span></div>
          <div style={{ fontWeight: 700, color: "#444" }}>Mined</div>
          <div style={{ color: "#8d4cff" }}>{stats.days} Days</div>
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div><span role="img" aria-label="speed">⚡</span></div>
          <div style={{ fontWeight: 700, color: "#444" }}>Speed</div>
          <div style={{ color: "#8d4cff" }}>{stats.speed.toFixed(2)}/h</div>
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div><span role="img" aria-label="rank">📊</span></div>
          <div style={{ fontWeight: 700, color: "#444" }}>Rank</div>
          <div style={{ color: "#8d4cff" }}>{stats.rank}</div>
        </div>
      </div>

      {/* Invite Friends */}
      <div style={{
        background: "#f7f5ff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ fontWeight: 600 }}>Invite Friends & get boost</div>
        <button style={{
          background: "#8d4cff",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "7px 18px",
          fontWeight: 600,
          fontSize: 16,
        }}>Invite</button>
      </div>

      {/* Mine More & Earn More */}
      <div style={{
        background: "#f7f5ff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 18
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/mine-icon.png" alt="Mine" width={38} />
          <div>
            <div style={{ fontWeight: 700 }}>Mine More & Earn More</div>
            <div style={{ fontSize: 13, color: "#888" }}>
              Mine for numbers of days and collect your bonus coins here!
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          {[10,20,30].map((n) => (
            <div key={n} style={{
              background: "#fff",
              borderRadius: 8,
              padding: "5px 14px",
              fontWeight: 600,
              color: "#8d4cff"
            }}>{n}</div>
          ))}
          <div style={{
            background: "#fff",
            borderRadius: 8,
            padding: "5px 14px",
            fontWeight: 600,
            color: "#8d4cff"
          }}>...</div>
          <button
            onClick={collectBonus}
            style={{
              marginLeft: "auto",
              background: "#8d4cff",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "7px 18px",
              fontWeight: 600,
              fontSize: 16,
            }}>
            Collect
          </button>
        </div>
      </div>

      {/* Rate us */}
      <div style={{
        background: "#f7f5ff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div>
          <div style={{ fontWeight: 600 }}>Rate us</div>
          <div style={{ fontSize: 13, color: "#888" }}>
            Rate us on Play Store and know us your experience
          </div>
        </div>
        <button style={{
          background: "#ffe135",
          color: "#8d4cff",
          border: "none",
          borderRadius: 10,
          padding: "7px 18px",
          fontWeight: 700,
          fontSize: 16,
        }}>⭐ 50</button>
      </div>

      {/* Spinning Wheel Modal */}
      {showWheel && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "#0009",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 30,
            padding: 24,
            width: 370,
            boxShadow: "0 0 24px #8d4cff88",
            position: "relative"
          }}>
            <button
              onClick={() => setShowWheel(false)}
              style={{
                position: "absolute",
                right: 18,
                top: 18,
                border: "none",
                background: "#eee",
                borderRadius: 20,
                width: 32,
                height: 32,
                fontSize: 20,
                cursor: "pointer"
              }}
            >✖</button>
            <SpinningWheelGame />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupremeAmerDashboard;
