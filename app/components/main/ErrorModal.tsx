const ErrorModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay " onClick={onClose}>
      <div className="modal-content bg-bg" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <h6 className="text-warning">&times;</h6>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ErrorModal;
