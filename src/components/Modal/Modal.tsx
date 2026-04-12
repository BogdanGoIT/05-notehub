import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleSubmit}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
}
