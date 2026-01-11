import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Topup from "./pages/Topup";
import Account from "./pages/Account";

import ServicePayment from "./pages/ServicePayment";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/payment/:serviceCode" element={<ServicePayment />} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
