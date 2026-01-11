import formatRupiah from "../../utils/formatRupiah";

const ConfirmTopupModal = ({ amount, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 text-center space-y-5">
        <h2 className="text-lg font-semibold mb-3">
          Konfirmasi Top Up
        </h2>

        <div className="flex flex-col">
          <p className="text-md">
            Apakah Anda yakin ingin top up sebesar{" "}
          </p>
          <strong className="text-2xl">{formatRupiah(amount)}?</strong>
        </div>

        <div className="flex flex-col gap-y-4">
          <button
            onClick={onConfirm}
            className="text-[#F13B2F] font-bold"
          >
            Ya, Lanjutkan TopUp
          </button>
          <button
            onClick={onClose}
            className=""
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTopupModal;
