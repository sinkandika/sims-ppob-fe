

const ConfirmPaymentModal = ({ serviceCode, amount, onClose, onConfirm }) => {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 text-center space-y-5">
        <h2 className="text-md font-semibold">
          Konfirmasi Pembayaran
        </h2>

        <div className="flex flex-col" >
          <p className="text-md">
            Bayar <strong>{serviceCode}</strong> sebesar
          </p>
          <strong className="text-2xl">Rp {Number(amount).toLocaleString("id-ID")}?</strong>
        </div>
        
        <div className="flex flex-col gap-y-4">
          <button
            onClick={onConfirm}
            className="text-[#F13B2F] font-bold"
          >
            Ya, proses Top Up
          </button>
          <button
            onClick={onClose}
            className=""
          >
            Batalkan
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmPaymentModal;
