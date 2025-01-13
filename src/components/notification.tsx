import React from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`notification ${type}`}
      onClick={onClose}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        padding: "15px 20px",
        borderRadius: "8px",
        backgroundColor: type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
