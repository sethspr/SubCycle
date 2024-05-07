import React, { useState } from "react";

function DueDateModal({ isOpen, onClose, onConfirm }) {
  const [dueDate, setDueDate] = useState("");

  const handleConfirm = () => {
    onConfirm(dueDate);
    setDueDate("");
  };

  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Enter Due Date</h2>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default DueDateModal;
