import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/transactionHistoryService";
import formatRupiah from "../utils/formatRupiah";

import DefaultImage from "../assets/ProfilePhoto.png";
import { getProfile } from "../services/profileService";
import { getBalance } from "../services/balanceService";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5; // always fetch 5 per request
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true); // track if more records exist

  const navi = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [balance, setBalance] = useState(null);

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

  // get transaction
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactionHistory(limit, offset);
      const newRecords = data.records || [];

      setTransactions((prev) => [...prev, ...newRecords]); // append new records
      setOffset((prev) => prev + limit); // update offset for next fetch

      // If fewer records returned than limit, no more data
      if (newRecords.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  // fetch first batch on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  if (error) return <p>{error}</p>;
  if (transactions.length === 0 && loading) return <p>Loading...</p>;
  if (transactions.length === 0 && !loading) return <p>Tidak ada transaksi</p>;

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

      <div className="">
        <h2 className="font-bold text-md">Riwayat Transaksi</h2>

        <div className="flex flex-col gap-y-4 py-6">
          {transactions.map((t) => {
            const isTopup = t.transaction_type === "TOPUP";

            return (
              <div
                key={t.invoice_number}
                className="flex justify-between border border-[#C6C0C0] rounded-md p-4"
              >
                <div className="flex flex-col">
                  <p
                    className={`text-2xl font-medium ${
                      isTopup ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isTopup ? "+" : "-"}
                    {formatRupiah(t.total_amount)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(t.created_on).toLocaleString()}
                  </p>
                </div>

                <p className="text-sm font-medium">{t.description}</p>
              </div>
            );
          })}
        </div>

        {loading && <p>Loading...</p>}

        {hasMore && !loading && (
          <div className="flex justify-center pb-10">
            <button
              onClick={fetchTransactions}
              className="font-bold text-[#F13B2F]"
            >
              Show More
            </button>
          </div>
        )}

        {!hasMore && <p>Semua transaksi sudah ditampilkan</p>}

      </div>


    </div>
  );
};

export default TransactionPage;
