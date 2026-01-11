
const SuccessPaymentModal = ({ data, onClose}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 text-center space-y-5">
        <h2 className="text-md font-semibold">
          Transaksi Berhasil!
        </h2>

        <div className="flex flex-col gap-4" >
          <div>
            <p className="text-md">
              Invoice:
            </p>
            <strong>{data.invoice_number}</strong>
          </div>
          <button
            onClick={onClose}
            className="text-[#F13B2F] font-bold"
          >
            Tutup
          </button>
        </div>


      </div>
    </div>
  );
};

export default SuccessPaymentModal;
