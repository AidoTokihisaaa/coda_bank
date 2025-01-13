import React from "react";

interface Transaction {
  date: string;
  type: string;
  amount: number;
  balanceAfter: number;
  success: boolean;
}

interface HistoryProps {
  history: Transaction[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  const displayedHistory = history.slice(0, 10);

  return (
    <div className="history">
      <h2>Historique des Transactions</h2>
      {displayedHistory.length === 0 ? (
        <p>Aucune transaction disponible.</p>
      ) : (
        <ul>
          {displayedHistory.map((transaction, index) => (
            <li
              key={index}
              className={`history-item ${transaction.success ? "success" : "failed"}`}
            >
              <div>
                <p><strong>Date :</strong> {transaction.date}</p>
                <p><strong>Type :</strong> {transaction.type}</p>
                <p><strong>Montant :</strong> {transaction.amount}€</p>
                <p><strong>Solde après :</strong> {transaction.balanceAfter}€</p>
              </div>
              <span>{transaction.success ? "Réussi" : "Échoué"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
