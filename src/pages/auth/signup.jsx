import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup success
    setShowModal(true);
  };

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only one digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Optional: auto-submit when all 6 digits are filled
    const code = newOtp.join("");
    if (code.length === 6) {
      console.log("Auto-filled:", code);
      // handleVerify(); // Uncomment to auto-submit
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace to go back
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    if (digits.length === 6) {
      setOtp(digits);
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      navigate("/dashboard");
    } else {
      alert("Please enter a valid 6-digit code");
    }
  };

  // Focus first OTP input when modal opens
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    }
  }, [showModal]);

  return (
    <div className="flex h-screen">
      {/* Left side - Branding */}
      <div className="w-[35%] bg-primary text-white flex flex-col justify-between p-10">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="logo" className="h-8 w-8" />
          <h1 className="text-xl font-semibold">StoreIt</h1>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-lg font-bold mb-3">Join StoreIt Today</h2>
          <p className="text-sm font-light max-w-xs mx-auto">
            Create your account and start managing your files the smart way.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <img
            src="/auth-illustration.svg"
            alt="illustration"
            className="w-3/4"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-xl font-extrabold text-primary mb-6 text-start">
            Sign Up
          </h2>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg shadow-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg shadow-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg shadow-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-secondary transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-secondary">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white rounded-xl p-8 w-full max-w-sm shadow-lg text-center"
            onPaste={handlePaste}
          >
            <h3 className="text-lg font-bold text-primary mb-4">
              Enter Verification Code
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We sent a 6-digit code to your email.
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-between space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 text-center border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary text-lg bg-white"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-secondary transition"
            >
              Verify
            </button>

            <p className="mt-4 text-sm text-gray-500">
              Didn't receive a code?{" "}
              <button className="text-primary font-semibold hover:underline">
                Resend
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
