import formatRupiah from "../../utils/formatRupiah";


const SuccessTopupModal = ({ balance, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 text-center space-y-5">
        <h2 className="text-md font-semibold">
          Top Up Berhasil
        </h2>

        <div className="flex flex-col gap-4" >
          <div>
            <p className="text-md">
              Saldo Anda sekarang <br />
            </p>
            <strong>{formatRupiah(balance)}</strong>
          </div>
          <button
            onClick={onClose}
            className="text-[#F13B2F] font-bold"
          >
            OK
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuccessTopupModal;
