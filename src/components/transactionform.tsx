import { useState } from "react";

interface TransactionFormProps {
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  onTransferToSavings: (amount: number) => void;
  onWithdrawFromSavings: (amount: number) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onDeposit,
  onWithdraw,
  onTransferToSavings,
  onWithdrawFromSavings,
}) => {
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="transaction-form">
      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={() => onDeposit(amount)}>Déposer</button>
      <button onClick={() => onWithdraw(amount)}>Retirer</button>
      <button onClick={() => onTransferToSavings(amount)}>Vers épargne</button>
      <button onClick={() => onWithdrawFromSavings(amount)}>Depuis épargne</button>
    </div>
  );
};

export default TransactionForm;
