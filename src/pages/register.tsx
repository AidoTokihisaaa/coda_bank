import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authservice";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    try {
      AuthService.register(email, password);
      navigate("/login");
    } catch (err) {
      setError("Erreur : Impossible de s'inscrire.");
    }
  };

  return (
    <div>
      <div className="auth-background">
        <div className="wave"></div>
      </div>
      <div className="auth-container">
        <h1>Inscription</h1>
        {error && <div className="user-message error">{error}</div>}
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="secondary" onClick={handleRegister}>
          S'inscrire
        </button>
        <p>
          Déjà un compte ?{" "}
          <a onClick={() => navigate("/login")}>Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
