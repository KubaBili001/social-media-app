"use client";

import { ReactElement } from "react";

interface ModalProps {
  isOpen?: boolean;
  header?: ReactElement;
  body?: ReactElement;
  footer?: ReactElement;
}

export default function Modal({
  isOpen,
  header,
  body,
  footer,
}: ModalProps): ReactElement | null {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-background/50 outline-none focus:outline-none">
        <div className="bg-background rounded-md relative h-[500px] w-auto transition-[width]">
          {/* HEADER */}
          {header}

          {/* BODY */}
          {body}

          {/* FOOTER */}
          {footer}
        </div>
      </div>
    </>
  );
}
