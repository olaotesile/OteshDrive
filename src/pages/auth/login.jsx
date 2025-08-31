import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    // Here you'd normally check email/password
    // For now, just navigate
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-[35%] bg-primary text-white flex flex-col justify-between p-10">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="logo" className="h-8 w-8" />
          <h1 className="text-xl font-semibold">StoreIt</h1>
        </div>

        {/* Text content */}
        <div className="mt-16 text-center">
          <h2 className="text-lg font-bold mb-3">
            Manage your files the best way
          </h2>
          <p className="text-sm font-light max-w-xs mx-auto">
            Awesome, we’ve created the perfect place for you to store all your
            documents.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mt-10">
          <img
            src="/auth-illustration.svg"
            alt="illustration"
            className="w-3/4"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-xl font-extrabold text-primary mb-6 text-start">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg shadow-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg shadow-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-secondary transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-start text-secondary">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
