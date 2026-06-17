import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User, ShieldCheck, HelpCircle } from "lucide-react";

// ─── Password strength helper ──────────────────────────────
export function PasswordStrengthIndicator({ password }) {
  const getStrength = () => {
    if (!password) return { level: 0, label: "", color: "#e5e5e5" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: "Weak (कमज़ोर)", color: "#e53935" };
    if (score === 2) return { level: 2, label: "Fair (ठीक है)", color: "#fb8c00" };
    if (score === 3) return { level: 3, label: "Good (अच्छा)", color: "#43a047" };
    return { level: 4, label: "Strong (मज़बूत)", color: "#1b5e20" };
  };

  const { level, label, color } = getStrength();

  return (
    <div style={{ marginTop: "6px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              backgroundColor: i <= level ? color : "#e5e5e5",
              transition: "background-color 0.3s"
            }}
          />
        ))}
      </div>
      {label && (
        <span style={{ fontSize: "11px", color, fontWeight: "600" }}>{label}</span>
      )}
    </div>
  );
}

// ─── Hint tooltip helper ────────────────────────────────────
export function HintTooltip({ hint }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer", marginLeft: "6px" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <HelpCircle size={14} color="#C65D3B" />
      {show && (
        <span style={{
          position: "absolute",
          bottom: "calc(100% + 6px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#5C3A21",
          color: "white",
          padding: "6px 10px",
          borderRadius: "8px",
          fontSize: "11px",
          whiteSpace: "nowrap",
          zIndex: 100,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          lineHeight: "1.4"
        }}>
          {hint}
        </span>
      )}
    </span>
  );
}

// ─── Reusable floating-label input ─────────────────────────
export function AuthInput({
  label, type = "text", value, onChange, placeholder, icon: Icon, hint,
  error, autoComplete
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{
        display: "flex",
        alignItems: "center",
        fontSize: "13px",
        fontWeight: "600",
        color: "#5C3A21",
        marginBottom: "6px"
      }}>
        {label}
        {hint && <HintTooltip hint={hint} />}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon
            size={16}
            color="#C65D3B"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          />
        )}
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            width: "100%",
            padding: Icon ? "12px 42px 12px 42px" : "12px 16px",
            borderRadius: "12px",
            border: `1.5px solid ${error ? "#e53935" : "rgba(92, 58, 33, 0.2)"}`,
            backgroundColor: "#FFFDF9",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "#3E2B20",
            outline: "none",
            transition: "border-color 0.2s",
            boxSizing: "border-box"
          }}
          onFocus={(e) => e.target.style.borderColor = "#C65D3B"}
          onBlur={(e) => e.target.style.borderColor = error ? "#e53935" : "rgba(92, 58, 33, 0.2)"}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{
              position: "absolute", right: "14px", top: "50%",
              transform: "translateY(-50%)", background: "none",
              border: "none", cursor: "pointer", padding: 0
            }}
          >
            {show ? <EyeOff size={16} color="#7D6B60" /> : <Eye size={16} color="#7D6B60" />}
          </button>
        )}
      </div>
      {error && (
        <span style={{ fontSize: "11px", color: "#e53935", marginTop: "4px", display: "block" }}>
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

// ─── Auth page wrapper (full-screen with Indian background) ─
export function AuthPageWrapper({ children, title, subtitle }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5E6D3 0%, #FFFDF9 50%, #F5E6D3 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background patterns */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(198, 93, 59, 0.06) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(212, 160, 23, 0.06) 0%, transparent 50%)`,
        pointerEvents: "none"
      }} />
      {/* Corner mandala decoration */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "220px", height: "220px", opacity: 0.08,
        fontSize: "180px", lineHeight: 1, userSelect: "none"
      }}>
        🏵️
      </div>
      <div style={{
        position: "absolute", bottom: "-60px", left: "-60px",
        width: "200px", height: "200px", opacity: 0.08,
        fontSize: "160px", lineHeight: 1, userSelect: "none"
      }}>
        🏺
      </div>

      <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 2 }}>
        {/* Brand header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            marginBottom: "12px", cursor: "pointer"
          }}>
            <div style={{
              background: "#C65D3B", color: "white",
              width: "44px", height: "44px", borderRadius: "14px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", fontWeight: "bold",
              border: "2px solid #D4A017"
            }}>
              ह
            </div>
            <span style={{
              fontFamily: "var(--font-serif)",
              fontSize: "24px", fontWeight: "700", color: "#5C3A21"
            }}>
              HastKala MP
            </span>
          </div>
          {title && (
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px", color: "#5C3A21",
              margin: "0 0 6px"
            }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ fontSize: "13px", color: "#7D6B60", margin: 0 }}>{subtitle}</p>
          )}
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255, 253, 249, 0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          padding: "32px",
          border: "1.5px solid rgba(198, 93, 59, 0.15)",
          boxShadow: "0 20px 60px rgba(92, 58, 33, 0.12)"
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
