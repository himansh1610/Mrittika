import React, { useState } from "react";
import { User, Mail, Phone, Lock, ChevronRight, Upload, CheckCircle, Circle } from "lucide-react";
import { AuthPageWrapper, AuthInput, PasswordStrengthIndicator, HintTooltip } from "./AuthComponents";
import { registerUser, craftSpecializations, indianStates } from "../../data/users";

// ─── Step indicator ─────────────────────────────────────────
function StepDots({ step, total }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === step ? "24px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background: i <= step ? "#C65D3B" : "rgba(92,58,33,0.15)",
            transition: "all 0.3s"
          }}
        />
      ))}
    </div>
  );
}

// ─── Role selector card ─────────────────────────────────────
function RoleCard({ role, selected, onClick, icon, title, desc, showAdmin }) {
  if (role === "admin" && !showAdmin) return null;
  const isSelected = selected === role;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: "14px 16px",
        border: `2px solid ${isSelected ? "#C65D3B" : "rgba(92,58,33,0.15)"}`,
        borderRadius: "14px",
        background: isSelected ? "rgba(198,93,59,0.06)" : "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        textAlign: "left",
        transition: "all 0.2s",
        marginBottom: "10px"
      }}
    >
      <span style={{ fontSize: "28px" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "700", color: "#5C3A21", fontSize: "14px" }}>{title}</div>
        <div style={{ fontSize: "12px", color: "#7D6B60", marginTop: "2px" }}>{desc}</div>
      </div>
      {isSelected && <CheckCircle size={20} color="#C65D3B" />}
    </button>
  );
}

// ─── Main Signup Page ───────────────────────────────────────
export default function SignupPage({ onSignupSuccess, onNavigate }) {
  const [step, setStep] = useState(0); // 0=personal, 1=role, 2=artisan details (conditional), 3=done
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    role: "customer",
    businessName: "", state: "", district: "", specialization: "", about: "",
    profileImage: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  // Secret: click "HastKala MP" brand 5 times to unlock admin option
  const handleBrandClick = () => {
    const next = adminClickCount + 1;
    setAdminClickCount(next);
    if (next >= 5) setShowAdmin(true);
  };

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validateStep0 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "पूरा नाम ज़रूरी है";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "सही Email format लिखें";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "10 अंकों का सही Mobile नंबर लिखें";
    if (form.password.length < 6) e.password = "Password कम से कम 6 अक्षरों का होना चाहिए";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Password मेल नहीं खाते";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.businessName.trim()) e.businessName = "व्यवसाय का नाम लिखें";
    if (!form.state) e.state = "राज्य चुनें";
    if (!form.specialization) e.specialization = "कला श्रेणी चुनें";
    return e;
  };

  const TOTAL_STEPS = form.role === "artisan" ? 3 : 2;

  const goNext = () => {
    if (step === 0) {
      const errs = validateStep0();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
    }
    if (step === 2 && form.role === "artisan") {
      const errs = validateStep2();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const result = registerUser(form);
    setLoading(false);

    if (result.success) {
      onSignupSuccess(result.user);
    } else {
      setErrors({ global: result.error });
      setStep(0);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setForm((f) => ({ ...f, profileImage: url }));
  };

  const commonSelectStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid rgba(92, 58, 33, 0.2)",
    backgroundColor: "#FFFDF9",
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    color: "#3E2B20",
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23C65D3B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "40px"
  };

  return (
    <AuthPageWrapper
      title={
        <span onClick={handleBrandClick} style={{ cursor: "default" }}>
          खाता बनाएं · Create Account
        </span>
      }
      subtitle="Join 2000+ artisans and customers on HastKala MP"
    >
      <StepDots step={step} total={TOTAL_STEPS} />

      {/* ── STEP 0: Personal Details ── */}
      {step === 0 && (
        <div>
          <p style={{ fontSize: "13px", color: "#7D6B60", marginBottom: "20px", fontWeight: "500" }}>
            📝 व्यक्तिगत जानकारी (Personal Details)
          </p>

          {errors.global && (
            <div style={{ background: "#FFEBEE", border: "1px solid #FFCDD2", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#c62828", marginBottom: "16px" }}>
              ⚠ {errors.global}
            </div>
          )}

          <AuthInput
            label="पूरा नाम (Full Name)"
            value={form.name} onChange={update("name")}
            placeholder="e.g. Ramesh Kumar Patel"
            icon={User}
            hint="यहाँ अपना पूरा नाम लिखें"
            error={errors.name}
            autoComplete="name"
          />
          <AuthInput
            label="Email Address"
            type="email" value={form.email} onChange={update("email")}
            placeholder="yourname@email.com"
            icon={Mail}
            hint="सही Email address लिखें जो आप रोज़ use करते हैं"
            error={errors.email}
            autoComplete="email"
          />
          <AuthInput
            label="Mobile Number (मोबाइल नंबर)"
            type="tel" value={form.phone} onChange={update("phone")}
            placeholder="9876543210"
            icon={Phone}
            hint="10 अंकों का भारतीय Mobile नंबर"
            error={errors.phone}
            autoComplete="tel"
          />
          <div>
            <AuthInput
              label="Password (पासवर्ड)"
              type="password" value={form.password} onChange={update("password")}
              placeholder="••••••••"
              icon={Lock}
              hint="कम से कम 8 अक्षरों का पासवर्ड रखें। बड़े अक्षर और numbers मिलाएं"
              error={errors.password}
              autoComplete="new-password"
            />
            {form.password && <PasswordStrengthIndicator password={form.password} />}
          </div>
          <AuthInput
            label="Confirm Password (पासवर्ड दोबारा)"
            type="password" value={form.confirmPassword} onChange={update("confirmPassword")}
            placeholder="••••••••"
            icon={Lock}
            hint="ऊपर लिखा हुआ Password यहाँ दोबारा लिखें"
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={goNext}
            style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
              color: "white", border: "none", borderRadius: "14px",
              fontSize: "15px", fontWeight: "700", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", boxShadow: "0 4px 16px rgba(198,93,59,0.3)", marginTop: "8px"
            }}
          >
            अगला कदम (Next) <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ── STEP 1: Role Selection ── */}
      {step === 1 && (
        <div>
          <p style={{ fontSize: "13px", color: "#7D6B60", marginBottom: "16px", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}>
            आप क्या हैं? (Choose your role)
            <HintTooltip hint="यदि आप अपने उत्पाद बेचना चाहते हैं तो Artisan चुनें" />
          </p>

          <RoleCard
            role="customer" selected={form.role}
            onClick={() => setForm((f) => ({ ...f, role: "customer" }))}
            icon="🛒" title="Customer (ग्राहक)"
            desc="Browse and purchase authentic handmade products."
          />
          <RoleCard
            role="artisan" selected={form.role}
            onClick={() => setForm((f) => ({ ...f, role: "artisan" }))}
            icon="🏺" title="Artisan / Seller (कारीगर / विक्रेता)"
            desc="Sell your handmade crafts and local products."
          />
          <RoleCard
            role="admin" selected={form.role}
            onClick={() => setForm((f) => ({ ...f, role: "admin" }))}
            icon="🛡️" title="Admin (प्रशासक)"
            desc="Demo mode only — manage the entire platform."
            showAdmin={showAdmin}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => setStep(0)}
              style={{
                flex: 1, padding: "13px",
                background: "transparent", border: "1.5px solid rgba(92,58,33,0.2)",
                borderRadius: "14px", fontSize: "14px", fontWeight: "600",
                cursor: "pointer", color: "#7D6B60"
              }}
            >
              ← वापस (Back)
            </button>
            <button
              type="button"
              onClick={goNext}
              style={{
                flex: 2, padding: "13px",
                background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
                color: "white", border: "none", borderRadius: "14px",
                fontSize: "14px", fontWeight: "700", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              {form.role === "artisan" ? "जारी रखें (Continue)" : "खाता बनाएं (Create Account)"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Artisan Details (conditional) ── */}
      {step === 2 && form.role === "artisan" && (
        <div>
          <p style={{ fontSize: "13px", color: "#7D6B60", marginBottom: "20px", fontWeight: "500" }}>
            🏺 आपकी कला की जानकारी (Artisan Details)
          </p>

          <AuthInput
            label="व्यवसाय का नाम (Business Name)"
            value={form.businessName} onChange={update("businessName")}
            placeholder="e.g. Ramesh Pottery Works"
            icon={User}
            hint="आपकी दुकान या काम का नाम लिखें"
            error={errors.businessName}
          />

          {/* State selector */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", fontSize: "13px", fontWeight: "600", color: "#5C3A21", marginBottom: "6px" }}>
              राज्य (State) <HintTooltip hint="आप किस राज्य में काम करते हैं?" />
            </label>
            <select value={form.state} onChange={update("state")} style={commonSelectStyle}>
              <option value="">राज्य चुनें (Choose State)</option>
              {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <span style={{ fontSize: "11px", color: "#e53935", marginTop: "4px", display: "block" }}>⚠ {errors.state}</span>}
          </div>

          <AuthInput
            label="ज़िला (District)"
            value={form.district} onChange={update("district")}
            placeholder="e.g. Dhar"
            hint="आप किस ज़िले में रहते हैं?"
          />

          {/* Specialization selector */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", fontSize: "13px", fontWeight: "600", color: "#5C3A21", marginBottom: "6px" }}>
              कला श्रेणी (Craft Specialization) <HintTooltip hint="अपनी मुख्य कला या शिल्प चुनें" />
            </label>
            <select value={form.specialization} onChange={update("specialization")} style={commonSelectStyle}>
              <option value="">कला चुनें (Choose Craft)</option>
              {craftSpecializations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.specialization && <span style={{ fontSize: "11px", color: "#e53935", marginTop: "4px", display: "block" }}>⚠ {errors.specialization}</span>}
          </div>

          {/* About */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", fontSize: "13px", fontWeight: "600", color: "#5C3A21", marginBottom: "6px" }}>
              अपने बारे में बताएं (About You) <HintTooltip hint="ग्राहकों को अपनी कला और परंपरा के बारे में बताएं" />
            </label>
            <textarea
              value={form.about}
              onChange={update("about")}
              placeholder="अपनी कला, परंपरा और अनुभव के बारे में लिखें... (Tell customers about your craft and story)"
              rows={4}
              style={{
                width: "100%", padding: "12px 16px",
                borderRadius: "12px", border: "1.5px solid rgba(92,58,33,0.2)",
                backgroundColor: "#FFFDF9", fontFamily: "var(--font-sans)",
                fontSize: "14px", color: "#3E2B20", outline: "none",
                resize: "vertical", boxSizing: "border-box"
              }}
            />
          </div>

          {/* Profile Image Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#5C3A21", display: "block", marginBottom: "8px" }}>
              Profile Photo (प्रोफाइल फोटो) — Optional
            </label>
            <label style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "12px 16px", border: "1.5px dashed rgba(198,93,59,0.4)",
              borderRadius: "12px", cursor: "pointer", background: "#FFFDF9"
            }}>
              {previewImage ? (
                <img src={previewImage} alt="preview" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#F5E6D3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Upload size={20} color="#C65D3B" />
                </div>
              )}
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#5C3A21" }}>
                  {previewImage ? "फोटो बदलें (Change)" : "फोटो Upload करें"}
                </div>
                <div style={{ fontSize: "11px", color: "#7D6B60" }}>JPG, PNG – max 5MB</div>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                flex: 1, padding: "13px",
                background: "transparent", border: "1.5px solid rgba(92,58,33,0.2)",
                borderRadius: "14px", fontSize: "14px", fontWeight: "600",
                cursor: "pointer", color: "#7D6B60"
              }}
            >
              ← वापस
            </button>
            <button
              type="button"
              onClick={goNext}
              style={{
                flex: 2, padding: "13px",
                background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
                color: "white", border: "none", borderRadius: "14px",
                fontSize: "14px", fontWeight: "700", cursor: "pointer"
              }}
            >
              खाता बनाएं (Create Account)
            </button>
          </div>
        </div>
      )}

      {/* ── STEP: Final confirmation ── */}
      {((step === 2 && form.role !== "artisan") || (step === 3 && form.role === "artisan")) && (
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "linear-gradient(135deg, #C65D3B, #D4A017)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: "32px"
          }}>
            ✅
          </div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#5C3A21", marginBottom: "8px" }}>
            लगभग हो गया! Almost Done!
          </h3>
          <p style={{ fontSize: "13px", color: "#7D6B60", marginBottom: "24px", lineHeight: "1.6" }}>
            <strong>{form.name}</strong> के लिए खाता तैयार है।
            <br />Role: <strong style={{ color: "#C65D3B", textTransform: "capitalize" }}>{form.role}</strong>
          </p>

          {/* Summary box */}
          <div style={{
            background: "#F5E6D3", borderRadius: "14px", padding: "16px",
            textAlign: "left", marginBottom: "24px", fontSize: "13px", color: "#5C3A21"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>📧 Email</span><span style={{ fontWeight: "600" }}>{form.email}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>📱 Phone</span><span style={{ fontWeight: "600" }}>{form.phone}</span>
            </div>
            {form.role === "artisan" && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>🏺 Craft</span><span style={{ fontWeight: "600" }}>{form.specialization}</span>
              </div>
            )}
          </div>

          {errors.global && (
            <div style={{ background: "#FFEBEE", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#c62828", marginBottom: "16px", textAlign: "left" }}>
              ⚠ {errors.global}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#D4A017" : "linear-gradient(135deg, #C65D3B, #9E3D22)",
              color: "white", border: "none", borderRadius: "14px",
              fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(198,93,59,0.3)"
            }}
          >
            {loading ? "खाता बन रहा है... ⏳" : "🎉 खाता बनाएं (Finish & Enter)"}
          </button>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#7D6B60" }}>
        पहले से खाता है?{" "}
        <button
          onClick={() => onNavigate("login")}
          style={{ background: "none", border: "none", color: "#C65D3B", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
        >
          Login करें →
        </button>
      </div>
    </AuthPageWrapper>
  );
}
