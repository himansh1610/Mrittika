import React, { useState } from "react";
import { User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AuthPageWrapper, AuthInput } from "./AuthComponents";
import { loginUser, demoUsers } from "../../data/users";

export default function LoginPage({ onLoginSuccess, onNavigate }) {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.emailOrPhone.trim()) errs.emailOrPhone = "Email या Mobile number ज़रूरी है";
    if (!form.password) errs.password = "Password ज़रूरी है";
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setGlobalError("");
    setLoading(true);

    // Simulate async network delay
    await new Promise((r) => setTimeout(r, 800));

    const user = loginUser(form.emailOrPhone, form.password);
    setLoading(false);

    if (user) {
      onLoginSuccess(user);
    } else {
      setGlobalError("गलत Email/Mobile या Password है। कृपया दोबारा कोशिश करें।");
    }
  };

  const handleGuest = () => onLoginSuccess(null);

  const fillDemo = (type) => {
    const creds = {
      customer: { emailOrPhone: "customer@hastkala.com", password: "123456" },
      artisan:  { emailOrPhone: "artisan@hastkala.com",  password: "123456" },
      admin:    { emailOrPhone: "admin@hastkala.com",    password: "123456" }
    };
    setForm(creds[type]);
    setErrors({});
    setGlobalError("");
  };

  return (
    <AuthPageWrapper
      title="स्वागत है! Welcome Back"
      subtitle="India's Digital Heritage Marketplace"
    >
      {/* Demo quick-fill strip */}
      <div style={{
        background: "linear-gradient(90deg, #FBF3E6, #F5E6D3)",
        border: "1px dashed #D4A017",
        borderRadius: "12px",
        padding: "12px 16px",
        marginBottom: "24px"
      }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#5C3A21", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          🎯 Demo Quick Login (Sandbox)
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "🛒 Customer", type: "customer" },
            { label: "🏺 Artisan", type: "artisan" },
            { label: "🛡️ Admin",   type: "admin" }
          ].map(({ label, type }) => (
            <button
              key={type}
              type="button"
              onClick={() => fillDemo(type)}
              style={{
                background: "white",
                border: "1px solid rgba(198, 93, 59, 0.3)",
                borderRadius: "8px",
                padding: "5px 12px",
                fontSize: "12px",
                cursor: "pointer",
                color: "#5C3A21",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.target.style.background = "#C65D3B"; e.target.style.color = "white"; }}
              onMouseLeave={(e) => { e.target.style.background = "white"; e.target.style.color = "#5C3A21"; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleLogin} noValidate>
        <AuthInput
          label="Email या Mobile Number"
          type="text"
          value={form.emailOrPhone}
          onChange={(e) => setForm({ ...form, emailOrPhone: e.target.value })}
          placeholder="email@example.com या 9876543210"
          icon={Mail}
          hint="अपना Email या Mobile नंबर यहाँ लिखें"
          error={errors.emailOrPhone}
          autoComplete="username"
        />
        <AuthInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          icon={Lock}
          hint="कम से कम 6 अक्षरों का Password"
          error={errors.password}
          autoComplete="current-password"
        />

        {globalError && (
          <div style={{
            background: "#FFEBEE", border: "1px solid #FFCDD2",
            borderRadius: "10px", padding: "10px 14px",
            fontSize: "13px", color: "#c62828",
            marginBottom: "16px"
          }}>
            ⚠ {globalError}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button
            type="button"
            onClick={() => onNavigate("forgot-password")}
            style={{ background: "none", border: "none", color: "#C65D3B", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
          >
            Forgot Password? (पासवर्ड भूल गए?)
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#D4A017" : "linear-gradient(135deg, #C65D3B, #9E3D22)",
            color: "white",
            border: "none",
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
            boxShadow: "0 4px 16px rgba(198, 93, 59, 0.3)"
          }}
        >
          {loading ? "Logging in... ⏳" : (<>Login करें <ArrowRight size={18} /></>)}
        </button>

        <button
          type="button"
          onClick={handleGuest}
          style={{
            width: "100%",
            padding: "12px",
            background: "transparent",
            border: "1.5px solid rgba(92, 58, 33, 0.2)",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            color: "#7D6B60",
            marginTop: "10px"
          }}
        >
          Guest के रूप में ब्राउज़ करें (Browse as Guest)
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#7D6B60" }}>
        नया खाता बनाएं?{" "}
        <button
          onClick={() => onNavigate("signup")}
          style={{ background: "none", border: "none", color: "#C65D3B", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
        >
          Create Account →
        </button>
      </div>
    </AuthPageWrapper>
  );
}
