import { NavLink, Outlet } from "react-router-dom";
import Logo from "../assets/Logo.png";

function MainLayout() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 font-semibold"
      : "text-gray-700 hover:text-red-500";

  return (
    <>
      <div className="flex justify-between p-4 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-x-2">
          <img src={Logo} alt="logo" />
          <p className="font-bold">SIMS PPOB</p>
        </div>

        <nav className="space-x-10">
          <NavLink to="/dashboard" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/topup" className={linkClass}>
            Topup
          </NavLink>
          <NavLink to="/transaction" className={linkClass}>
            Transaction
          </NavLink>
          <NavLink to="/account" className={linkClass}>
            Akun
          </NavLink>
        </nav>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
