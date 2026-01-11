import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetRegisterState } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

import Illustration from "../assets/IllustrasiLoginRegister.png"
import Logo from "../assets/Logo.png"

const Register = () => {
	const disp = useDispatch();
	const nav = useNavigate();
	const { isLoading, error, registerSuccess } = useSelector(
		(state) => state.auth
	);

	const [form, setForm] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// register system (call from authSlice.js)
	const handleSubmit = (e) => {
		e.preventDefault();

		// validation
		if (!form.email.includes("@")) {
				alert("Email tidak valid");
		return;
		}
		if (form.password.length < 8) {
				alert("Password harus setidaknya 8 karakter");
		return;
		}
		if (form.password !== form.confirmPassword){
				alert("Password tidak cocok")
		}

		disp(register(form));
	};

	useEffect(() => {
		if (registerSuccess) {
			alert("Registrasi berhasil, silahkan login");
			disp(resetRegisterState()); // reset register
			nav("/login");
		}
	}, [registerSuccess, disp, nav]);


	return (
		<main className="flex flex-row justify-between h-screen">
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
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
              />
              <input
              name="first_name"
              placeholder="Nama depan"
              onChange={handleChange}
              className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
              />
              <input
              name="last_name"
              placeholder="Nama belakang"
              onChange={handleChange}
              className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
              />
              <input
              name="password"
              type="password"
              placeholder="Kata sandi"
              onChange={handleChange}
              className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
              />
              <input
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi kata sandi"
              onChange={handleChange}
              className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-y-5">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
              type="submit"
              disabled={isLoading}
              className="bg-[#F13B2F] flex rounded-md p-2 justify-center text-white hover:bg-[#F45E60] "
              >
              {isLoading ? "Loading..." : "Register"}
              </button>
              <p className="text-center"> 
                sudah punya akun? Login
                <Link to="/login" className="text-[#F13B2F]"> disini</Link>
              </p>
            </div>
          </form>

        </div>
      </div>

      <div className="flex flex-1">
        <div className="h-full hidden md:block w-full">
          <img
          src={Illustration}
          alt="logo"
          className="w-full h-full"
          />
        </div>
      </div>

		</main>
	);
};

export default Register;
