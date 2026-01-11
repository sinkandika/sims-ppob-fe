const FailedPaymentModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 p-6 text-center">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Transaksi Gagal
        </h2>

        <p className="text-sm mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default FailedPaymentModal;
