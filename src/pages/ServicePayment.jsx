import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServices } from "../services/serviceService";
import { createTransaction } from "../services/transactionService";

import ConfirmPaymentModal from "../components/modals/PaymentConfirmModal";
import SuccessPaymentModal from "../components/modals/PaymentSuccessModal";
import FailedPaymentModal from "../components/modals/PaymentFailedModal";
import { getProfile } from "../services/profileService";
import { getBalance } from "../services/balanceService";
import formatRupiah from "../utils/formatRupiah";

import DefaultImage from "../assets/ProfilePhoto.png";

const ServicePayment = () => {
  const [profileData, setProfileData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const navi = useNavigate();

  const { serviceCode } = useParams();
  const [nominal, setNominal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // get default image or api image
  const profileImage =
    profileData?.profile_image &&
    !profileData.profile_image.endsWith("/null")
      ? profileData.profile_image
      : DefaultImage;

  // get profile and balance
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile(); // from profileService.js
        const saldo = await getBalance(); // from BalanceService.js

        setProfileData(profile); // include first_name, last_name, profile_image
        setBalance(saldo);
      } catch (error) {
        if (error.message === "UNAUTHORIZED") {
          navi("/login");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, [navi]);

  // fetch service nominal
  useEffect(() => {
    const fetchNominal = async () => {
      try {
        const services = await getServices();
        const service = services.find(s => s.service_code === serviceCode);
        if (service) {
          setNominal(service.service_tariff);
        } else {
          setNominal(0);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNominal();
  }, [serviceCode]);

  // handle payment
  const handleConfirmPayment = async () => {
    try {
      const result = await createTransaction(serviceCode); // from TransactionService.js
      setTransactionData(result.data);
      setShowConfirm(false);
      setShowSuccess(true);

      // fetch updated balance from backend
      const updatedBalance = await getBalance();
      setBalance(updatedBalance); // update the balance state

    } catch (err) {
      setErrorMessage(err.message || "Transaksi gagal");
      setShowConfirm(false);
      setShowFailed(true);
    }
  };

  return (
    <div className="px-10">
      <div className="flex flex-col md:flex-row justify-center p-5">
        <div className="flex flex-1 flex-col p-8 space-y-2 justify-center">
          <img
            src={profileImage}
            alt="Profile-image"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p classname="text-md">Selamat datang,</p>
            <p className="text-2xl font-bold">{profileData?.first_name} {profileData?.last_name}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-[#ED3B2D] text-white space-y-2 p-8 rounded-lg justify-center align-middle">
          <p classname="text-md">Saldo anda</p>
          <p className="text-2xl font-bold">{formatRupiah(balance)}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col space-y-2">
        <p>PemBayaran:</p>
        <p>{serviceCode}</p>
        <input
        type="number" 
        value={nominal} 
        readOnly 
        className="border border-[#C6C0C0] outline-none p-2 rounded-md"
        />
        <button 
        onClick={() => setShowConfirm(true)}
        className="bg-[#F13B2F] flex rounded-md p-2 justify-center text-white hover:bg-[#F45E60] "
        >
          Bayar
        </button>
      </div>

      {showConfirm && (
        <ConfirmPaymentModal
          serviceCode={serviceCode}
          amount={nominal}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmPayment}
        />
      )}

      {showSuccess && (
        <SuccessPaymentModal
          data={transactionData}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showFailed && (
        <FailedPaymentModal
          message={errorMessage}
          onClose={() => setShowFailed(false)}
        />
      )}
    </div>
  );
};

export default ServicePayment;
