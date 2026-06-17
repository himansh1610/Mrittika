import React, { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle, Lock } from "lucide-react";
import { AuthPageWrapper, AuthInput } from "./AuthComponents";

const DEMO_ACCOUNTS = {
  "customer@hastkala.com": "123456",
  "artisan@hastkala.com":  "123456",
  "admin@hastkala.com":    "123456"
};

export default function ForgotPasswordPage({ onNavigate }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) { setError("Email या Phone ज़रूरी है"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(mockOtp);
    setSent(true);
  };

  const handleVerify = () => {
    if (enteredOtp === otp) {
      setOtpError("");
    } else {
      setOtpError("गलत OTP। कृपया दोबारा कोशिश करें।");
    }
  };

  const handleReset = async () => {
    if (!newPassword || newPassword.length < 6) { setOtpError("Password कम से कम 6 अक्षरों का होना चाहिए"); return; }
    if (enteredOtp !== otp) { setOtpError("पहले OTP verify करें"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
  };

  return (
    <AuthPageWrapper
      title="Password Reset"
      subtitle="पासवर्ड भूल जाना आम बात है, हम मदद करेंगे"
    >
      {!done ? (
        <>
          {!sent ? (
            <>
              <p style={{ fontSize: "13px", color: "#7D6B60", marginBottom: "20px" }}>
                अपना Email या Mobile नंबर दर्ज करें। हम आपको एक OTP भेजेंगे।
              </p>

              <AuthInput
                label="Email या Mobile Number"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="email@example.com या 9876543210"
                icon={Mail}
                hint="वही Email/Phone दर्ज करें जिससे आपने account बनाया था"
                error={error}
              />

              {/* Demo hint */}
              <div style={{
                background: "#FBF3E6", border: "1px dashed #D4A017",
                borderRadius: "10px", padding: "10px 14px",
                fontSize: "12px", color: "#7D6B60", marginBottom: "20px"
              }}>
                🔐 <strong>Sandbox mode:</strong> OTP will appear on screen instantly.<br />
                Demo emails: customer@hastkala.com / artisan@hastkala.com / admin@hastkala.com
              </div>

              <button
                onClick={handleSend}
                disabled={loading}
                style={{
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
                  color: "white", border: "none", borderRadius: "14px",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 4px 16px rgba(198,93,59,0.3)"
                }}
              >
                {loading ? "भेज रहे हैं... ⏳" : (<><Send size={16} /> OTP भेजें (Send OTP)</>)}
              </button>
            </>
          ) : (
            <>
              {/* OTP display (demo only) */}
              <div style={{
                background: "#E8F5E9", border: "2px dashed #43a047",
                borderRadius: "12px", padding: "14px",
                textAlign: "center", marginBottom: "20px"
              }}>
                <p style={{ fontSize: "12px", color: "#388e3c", marginBottom: "4px" }}>
                  ✅ OTP sent (demo mode — showing here)
                </p>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#1b5e20", letterSpacing: "8px" }}>
                  {otp}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#5C3A21", display: "block", marginBottom: "6px" }}>
                  OTP दर्ज करें (Enter OTP)
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="------"
                    style={{
                      flex: 1, padding: "12px 16px",
                      borderRadius: "12px", border: `1.5px solid ${otpError ? "#e53935" : "rgba(92,58,33,0.2)"}`,
                      backgroundColor: "#FFFDF9", fontFamily: "var(--font-sans)",
                      fontSize: "22px", color: "#3E2B20", outline: "none",
                      letterSpacing: "6px", textAlign: "center"
                    }}
                  />
                  <button
                    onClick={handleVerify}
                    style={{
                      padding: "12px 18px", background: "#C65D3B",
                      color: "white", border: "none", borderRadius: "12px",
                      fontWeight: "700", cursor: "pointer", fontSize: "13px"
                    }}
                  >
                    Verify
                  </button>
                </div>
                {otpError && <span style={{ fontSize: "11px", color: "#e53935", marginTop: "4px", display: "block" }}>⚠ {otpError}</span>}
              </div>

              {enteredOtp === otp && enteredOtp.length === 6 && (
                <AuthInput
                  label="नया Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  icon={Lock}
                  hint="नया password कम से कम 6 अक्षरों का होना चाहिए"
                />
              )}

              <button
                onClick={handleReset}
                disabled={loading}
                style={{
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
                  color: "white", border: "none", borderRadius: "14px",
                  fontSize: "15px", fontWeight: "700", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(198,93,59,0.3)", marginTop: "4px"
                }}
              >
                {loading ? "Reset कर रहे हैं... ⏳" : "Password Reset करें"}
              </button>
            </>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "linear-gradient(135deg, #43a047, #1b5e20)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: "36px"
          }}>
            ✅
          </div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#5C3A21", marginBottom: "8px" }}>
            Password Reset हो गया!
          </h3>
          <p style={{ fontSize: "13px", color: "#7D6B60", marginBottom: "24px" }}>
            आपका password सफलतापूर्वक बदल दिया गया है।<br />
            (Your password has been successfully reset.)
          </p>
          <button
            onClick={() => onNavigate("login")}
            style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #C65D3B, #9E3D22)",
              color: "white", border: "none", borderRadius: "14px",
              fontSize: "15px", fontWeight: "700", cursor: "pointer"
            }}
          >
            Login करें (Login Now)
          </button>
        </div>
      )}

      {!done && (
        <button
          onClick={() => onNavigate("login")}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            margin: "20px auto 0", background: "none", border: "none",
            color: "#7D6B60", cursor: "pointer", fontSize: "13px", fontWeight: "600"
          }}
        >
          <ArrowLeft size={14} /> Login पर वापस जाएं
        </button>
      )}
    </AuthPageWrapper>
  );
}
