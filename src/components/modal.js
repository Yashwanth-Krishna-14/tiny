import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus(); // Focus on the modal when it opens
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Close modal on Escape key press
      }
    };

    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        ref={modalRef}
        tabIndex="-1" // Make the modal focusable
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;