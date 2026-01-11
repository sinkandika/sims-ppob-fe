import { useEffect, useState } from "react";
import { topupBalance } from "../services/topupService";
import formatRupiah from "../utils/formatRupiah";
import { useNavigate } from "react-router-dom";

import DefaultImage from "../assets/ProfilePhoto.png";
import { getProfile } from "../services/profileService";
import { getBalance } from "../services/balanceService";

import ConfirmTopupModal from "../components/modals/TopupConfirmModal";
import SuccessTopupModal from "../components/modals/TopupSuccessModal";
import FailedTopupModal from "../components/modals/TopupFailedModal";

const Topup = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navi = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [balance, setBalance] = useState(null);

  const TOPUP_PRESETS = [10000, 20000, 50000, 100000, 200000, 500000];

  const MAX_TOPUP = 1_000_000;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

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
        const saldo = await getBalance();

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

  // update topup
	const handleConfirmTopup = async () => {
		setShowConfirmModal(false);

		try {
			setLoading(true);
			const response = await topupBalance(Number(amount));

			const updateBalance = await getBalance();
			setBalance(updateBalance);

			setShowSuccessModal(true);
			setAmount("");
		} catch (err) {
			setError(err.message);
			setShowFailedModal(true);
		} finally {
			setLoading(false);
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

      <div className="space-y-6">
        <div className="text-md">
          <h1>Silahkan masukan</h1>
          <h1 className="font-bold text-2xl">Nominal Top up</h1>
        </div>
        
        <div className="flex flex-col-reverse gap-y-4 gap-x-0 md:flex-row md:gap-x-4 md:gap-y-0">
          <div className="grid grid-cols-1 gap-4 flex-1">
            <input
              type="number"
              placeholder="Masukkan nominal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              max={MAX_TOPUP}
              className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
            />
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={loading || Number(amount) <= 0 || Number(amount) > MAX_TOPUP}
              className="bg-[#F13B2F] flex rounded-md p-2 justify-center text-white hover:bg-[#F45E60]"
            >
              Top Up
            </button>
            {error && (
              <p>{error}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 flex-1">
            {TOPUP_PRESETS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                className={`border rounded-lg p-3 text-sm font-medium transition
                  ${Number(amount) === value
                    ? "border-[#F13B2F] bg-gray-100"
                    : "hover:border-[#F13B2F]"
                  }`}
              >
                {formatRupiah(value)}
              </button>
            ))}
          </div>
        </div>
      </div>

			{showConfirmModal && (
				<ConfirmTopupModal
					amount={Number(amount)}
					onConfirm={handleConfirmTopup}
					onClose={() => setShowConfirmModal(false)}
				/>
			)}

			{showSuccessModal && (
				<SuccessTopupModal
					balance={balance}
					onClose={() => setShowSuccessModal(false)}
				/>
			)}

			{showFailedModal && (
				<FailedTopupModal
					message={error}
					onClose={() => setShowFailedModal(false)}
				/>
			)}

    </div>
  );
};

export default Topup;
