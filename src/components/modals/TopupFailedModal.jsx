const FailedTopupModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-3 text-red-600">
          Top Up Gagal
        </h2>

        <p className="mb-6">
          {message || "Terjadi kesalahan saat top up"}
        </p>

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

export default FailedTopupModal;
