import React, { useState } from "react";
import Balance from "../components/balance";
import History from "../components/history";
import TransactionForm from "../components/transactionform";

interface Transaction {
  date: string;
  type: string;
  amount: number;
  balanceAfter: number;
  success: boolean;
}

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(200);
  const [savings, setSavings] = useState<number>(0);
  const [overdraftLimit, setOverdraftLimit] = useState<number>(100);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [lastInterestDate, setLastInterestDate] = useState<Date | null>(null);

  const interestRate = 0.5; // Taux mensuel
  const interestInterval = 30 * 24 * 60 * 60 * 1000; // 30 jours en millisecondes

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);
  };

  const validateAmount = (amount: number): boolean => {
    if (!Number.isInteger(amount) || amount <= 0) {
      addNotification("Veuillez entrer un montant valide.");
      return false;
    }
    return true;
  };

  const addTransaction = (
    type: string,
    amount: number,
    newBalance: number,
    success: boolean
  ) => {
    const newTransaction: Transaction = {
      date: new Date().toLocaleString(),
      type,
      amount,
      balanceAfter: newBalance,
      success,
    };
    setHistory((prev) => [newTransaction, ...prev.slice(0, 9)]);
  };

  const handleDeposit = (amount: number) => {
    if (!validateAmount(amount)) return;
    const newBalance = balance + amount;
    setBalance(newBalance);
    addTransaction("Dépôt", amount, newBalance, true);
    addNotification("Dépôt effectué avec succès.");
  };

  const handleWithdraw = (amount: number) => {
    if (!validateAmount(amount)) return;
    const totalAvailable = balance + overdraftLimit;
    if (amount > totalAvailable) {
      addNotification("Fonds insuffisants pour ce retrait.");
      addTransaction("Retrait", amount, balance, false);
      return;
    }
    const newBalance = balance - amount;
    setBalance(newBalance);
    addTransaction("Retrait", amount, newBalance, true);
    addNotification("Retrait effectué avec succès.");
  };

  const handleTransferToSavings = (amount: number) => {
    if (!validateAmount(amount) || amount > balance) {
      addNotification("Montant invalide ou insuffisant.");
      return;
    }
    const newBalance = balance - amount;
    const newSavings = savings + amount;
    setBalance(newBalance);
    setSavings(newSavings);
    addTransaction("Transfert épargne", amount, newBalance, true);
    addNotification("Transfert vers épargne réussi.");
    applyInterest(newSavings);
  };

  const applyInterest = (newSavings: number) => {
    const now = new Date();
    if (
      !lastInterestDate ||
      now.getTime() - lastInterestDate.getTime() >= interestInterval
    ) {
      const interest = newSavings * (interestRate / 100);
      setSavings((prev) => prev + interest);
      addTransaction("Intérêt épargne", parseFloat(interest.toFixed(2)), newSavings, true);
      addNotification(`Intérêts de ${interest.toFixed(2)} € ajoutés.`);
      setLastInterestDate(now);
    }
  };

  const handleWithdrawFromSavings = (amount: number) => {
    if (!validateAmount(amount) || amount > savings) {
      addNotification("Fonds insuffisants dans l'épargne.");
      return;
    }
    const newBalance = balance + amount;
    const newSavings = savings - amount;
    setSavings(newSavings);
    setBalance(newBalance);
    addTransaction("Retrait épargne", amount, newBalance, true);
    addNotification("Retrait depuis épargne effectué.");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Coda Bank</h1>
        <div className="user-info">
          <span>Connecté en tant que :</span>
          <span>theogarces33@gmail.com</span>
          <button>Déconnexion</button>
        </div>
      </header>
      <main className="dashboard-main">
        <Balance balance={balance} />
        <div className="savings-container">
          <div className="savings-info">
            <div className="savings-card">
              <h3>Solde épargne</h3>
              <p>{savings.toFixed(2)} €</p>
            </div>
            <div className="overdraft-card">
              <h3>Découvert autorisé</h3>
              <p>{overdraftLimit} €</p>
            </div>
          </div>
        </div>
        <div className="notifications">
          {notifications.map((notif, index) => (
            <div key={index} className="notification">
              {notif}
            </div>
          ))}
        </div>
        <TransactionForm
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onTransferToSavings={handleTransferToSavings}
          onWithdrawFromSavings={handleWithdrawFromSavings}
        />
        <History history={history} />
      </main>
      <footer className="footer">© 2025 Coda Bank. Tous droits réservés.</footer>
    </div>
  );
};

export default Dashboard;
