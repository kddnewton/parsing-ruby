import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

type ModalStateContext = boolean;
type ModalActionContext = (open: boolean) => void;

const ModalStateContext = React.createContext<ModalStateContext>(false);
const ModalActionContext = React.createContext<ModalActionContext>(() => {});

export const Modal: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  useEffect(
    () => {
      document.body.style.overflow = open ? "hidden" : "initial";
    },
    [open]
  );

  return (
    <ModalStateContext.Provider value={open}>
      <ModalActionContext.Provider value={setOpen}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const ModalTrigger: React.FC<{ className?: string }> = ({ children, className }) => {
  const setOpen = useContext(ModalActionContext);

  const classNames = [styles.trigger, className].join(" ");
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  return (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export const ModalContent: React.FC = ({ children }) => {
  const open = useContext(ModalStateContext);

  if (!open) {
    return null;
  }

  return <ModalBody>{children}</ModalBody>;
};

const ModalBody: React.FC = ({ children }) => {
  const setOpen = useContext(ModalActionContext);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const modal = modalRef.current;

      const onClick = (event: MouseEvent) => {
        if (modal && event.target instanceof Element && !modal.contains(event.target)) {
          setOpen(false);
        }
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("click", onClick);
      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("click", onClick);
        document.removeEventListener("keydown", onKeyDown);
      };
    },
    [modalRef, setOpen]
  );

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.container}>
        {children}
      </div>
    </div>,
    document.body
  );
};
