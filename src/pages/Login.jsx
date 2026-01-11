import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

import Illustration from "../assets/IllustrasiLoginRegister.png"
import Logo from "../assets/Logo.png"

function Login() {
  const disp = useDispatch();
  const nav = useNavigate();

  const { isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  // login system 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // validation
    if (!email || !password) {
      setFormError("Email dan password dibutuhkan");
      return;
    }

    if (!email.includes("@")) {
      setFormError("Format email tidak valid");
      return;
    }

    if (password.length < 8) {
      setFormError("Password harus setidaknya 8 karakter");
      return;
    }

    disp(login({ email, password })); // call authSlice.js
  };

  // go to dashboard if success
  useEffect(() => {
    if (isAuthenticated) {
      nav("/dashboard");
    }
  }, [isAuthenticated, nav]);


  return (
    <main className="flex flex-row justify-between h-screen ">

      <div className="h-full w-full flex flex-2 flex-col items-center">
        <div className=" flex flex-col h-full w-lg justify-center p-10">

          <div className="flex flex-col items-center py-10 gap-y-4">
            <div className="flex justify-center items-center gap-x-2">
              <img
              src={Logo}
              alt="logo"
              />
              <p className="font-bold">
                SIMS PPOB
              </p>
            </div>
            <h2 className="text-lg w-60 text-center font-bold">
              Masuk atau buat akun untuk memulai
            </h2>
          </div>

          <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-y-5"
          >
            <div className="flex flex-col gap-y-5">
                <input
                  type="email"
                  value={email}
                  placeholder="Masukan email anda"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Masukan password anda"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
                />
            </div>
            <div className="flex flex-col gap-y-5">
              {formError && <p style={{ color: "red" }}>{formError}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
              type="submit"
              disabled={isLoading}
              className="bg-[#F13B2F] flex rounded-md p-2 justify-center text-white hover:bg-[#F45E60] "
              >
                {isLoading ? "Logging in..." : "Masuk"}
              </button>
              <p className="text-center">
                belum punya akun? Registrasi 
                <Link to="/register" className="text-[#F13B2F] "> disini</Link>
              </p>
            </div>
          </form>

        </div>
      </div>

      <div className="h-full hidden md:block shrink-0">
        <img
        src={Illustration}
        alt="logo"
        className="w-full h-full"
        />
      </div>

    </main>
  );
}

export default Login;
