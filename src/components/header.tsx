import React from "react";
import AuthService from "../services/authservice";

const Header: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <header className="app-header">
      <h1>Coda Bank</h1>
      {currentUser && (
        <div className="user-menu">
          <div className="user-icon">
            <span>👤</span>
            <span>{currentUser}</span>
          </div>
          <div className="user-dropdown">
            <p>Connecté en tant que :</p>
            <p><strong>{currentUser}</strong></p>
            <button
              className="logout-btn"
              onClick={() => {
                AuthService.logout();
                window.location.reload();
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
