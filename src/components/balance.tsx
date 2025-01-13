import React from "react";

interface BalanceProps {
  balance: number;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => {
  return (
    <div className="balance">
      <h2>Solde actuel</h2>
      <p>{balance}€</p>
    </div>
  );
};

export default Balance;
