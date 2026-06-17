import React, { useState, useEffect } from "react";
import { CheckCircle, ChevronRight, Star, Package, ShieldCheck, BarChart2 } from "lucide-react";

const customerSteps = [
  { id: "profile",  label: "Profile बनाएं",       hint: "अपनी जानकारी पूरी करें",     icon: "👤", done: true },
  { id: "browse",   label: "Products ब्राउज़ करें", hint: "हजारों handmade products देखें", icon: "🛍️", done: false },
  { id: "purchase", label: "पहली खरीदारी करें",    hint: "अपना पसंदीदा product खरीदें",  icon: "🛒", done: false },
  { id: "review",   label: "Review दें",           hint: "Artisan को feedback दें",     icon: "⭐", done: false },
];

const artisanSteps = [
  { id: "profile",  label: "Profile पूरा करें",    hint: "Business की जानकारी भरें",   icon: "🏺", done: true },
  { id: "product",  label: "पहला Product जोड़ें",   hint: "Artisan dashboard से add करें", icon: "📦", done: false },
  { id: "verify",   label: "Seller Verify होएं",  hint: "Admin से verification पाएं",  icon: "✅", done: false },
  { id: "sell",     label: "पहली बिक्री करें",     hint: "Orders का इंतजार करें",       icon: "💰", done: false },
];

const adminSteps = [
  { id: "login",    label: "Admin Login",         hint: "Secure admin access",         icon: "🛡️", done: true },
  { id: "users",    label: "Users देखें",          hint: "Manage all platform users",   icon: "👥", done: false },
  { id: "products", label: "Products Moderate करें", hint: "Review new listings",       icon: "📋", done: false },
  { id: "analytics", label: "Analytics देखें",    hint: "Platform insights",           icon: "📊", done: false },
];

function ProgressStep({ step, index, isLast }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          background: step.done
            ? "linear-gradient(135deg, #C65D3B, #D4A017)"
            : "rgba(92,58,33,0.08)",
          border: step.done ? "none" : "2px solid rgba(92,58,33,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", flexShrink: 0, transition: "all 0.3s"
        }}>
          {step.done ? <CheckCircle size={20} color="white" /> : step.icon}
        </div>
        {!isLast && (
          <div style={{
            width: "2px", height: "28px",
            background: step.done ? "#C65D3B" : "rgba(92,58,33,0.1)",
            marginTop: "4px", transition: "background 0.3s"
          }} />
        )}
      </div>
      <div style={{ paddingTop: "8px", paddingBottom: isLast ? 0 : "24px" }}>
        <div style={{
          fontWeight: "700", fontSize: "14px",
          color: step.done ? "#C65D3B" : "#5C3A21"
        }}>
          {step.label}
        </div>
        <div style={{ fontSize: "12px", color: "#7D6B60", marginTop: "2px" }}>
          {step.hint}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingWelcome({ user, onEnter, onNavigate }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const steps =
    user?.role === "artisan" ? artisanSteps :
    user?.role === "admin"   ? adminSteps   :
    customerSteps;

  const doneCount = steps.filter((s) => s.done).length;
  const pct = Math.round((doneCount / steps.length) * 100);

  const roleMeta = {
    customer: { emoji: "🛒", tag: "ग्राहक",   cta: "Products ब्राउज़ करें →",  dest: "home" },
    artisan:  { emoji: "🏺", tag: "कारीगर",   cta: "Artisan Dashboard →",      dest: "artisan-dashboard" },
    admin:    { emoji: "🛡️", tag: "प्रशासक",  cta: "Admin Dashboard →",        dest: "admin-dashboard" }
  };

  const meta = roleMeta[user?.role] || roleMeta.customer;

  const greeting = new Date().getHours() < 12 ? "सुप्रभात" : new Date().getHours() < 17 ? "नमस्ते" : "शुभ संध्या";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5E6D3 0%, #FFFDF9 60%, #FBF0E6 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)"
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #C65D3B, #D4A017)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: "36px",
            boxShadow: "0 8px 24px rgba(198,93,59,0.25)"
          }}>
            {meta.emoji}
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "26px", color: "#5C3A21", margin: "0 0 8px"
          }}>
            {greeting}, {user?.name?.split(" ")[0]}! 🙏
          </h2>
          <p style={{ fontSize: "14px", color: "#7D6B60", margin: 0 }}>
            HastKala MP में आपका स्वागत है •{" "}
            <span style={{
              background: "#C65D3B", color: "white",
              padding: "2px 10px", borderRadius: "20px",
              fontSize: "12px", fontWeight: "700"
            }}>
              {meta.tag}
            </span>
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,253,249,0.97)",
          borderRadius: "24px", padding: "28px",
          border: "1.5px solid rgba(198,93,59,0.15)",
          boxShadow: "0 20px 60px rgba(92,58,33,0.12)"
        }}>
          {/* Progress bar */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#5C3A21" }}>
                Profile Progress
              </span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#C65D3B" }}>{pct}%</span>
            </div>
            <div style={{ background: "rgba(92,58,33,0.1)", borderRadius: "6px", height: "8px", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "6px",
                background: "linear-gradient(90deg, #C65D3B, #D4A017)",
                width: `${pct}%`, transition: "width 0.8s ease"
              }} />
            </div>
          </div>

          {/* Steps */}
          <div style={{ marginBottom: "28px" }}>
            {steps.map((step, i) => (
              <ProgressStep key={step.id} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>

          {/* CTA Buttons */}
          <button
            onClick={() => onEnter(meta.dest)}
            style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
              color: "white", border: "none", borderRadius: "14px",
              fontSize: "15px", fontWeight: "700", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              boxShadow: "0 4px 16px rgba(198,93,59,0.3)", marginBottom: "10px"
            }}
          >
            {meta.cta}
          </button>

          <button
            onClick={() => onEnter("home")}
            style={{
              width: "100%", padding: "12px",
              background: "transparent", border: "1.5px solid rgba(92,58,33,0.15)",
              borderRadius: "14px", fontSize: "14px", fontWeight: "600",
              cursor: "pointer", color: "#7D6B60"
            }}
          >
            Homepage देखें (Go to Home)
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: "11px", color: "#9E8977", marginTop: "16px" }}>
          🏺 HastKala MP — India's Heritage Marketplace · Sandbox / Demo Mode
        </p>
      </div>
    </div>
  );
}
