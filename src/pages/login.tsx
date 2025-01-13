import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authservice";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      AuthService.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur : Identifiants incorrects.");
    }
  };

  return (
    <div>
      <div className="auth-background">
        <div className="wave"></div>
      </div>
      <div className="auth-container">
        <h1>Connexion</h1>
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
        <button className="primary" onClick={handleLogin}>
          Se connecter
        </button>
        <p>
          Pas encore de compte ?{" "}
          <a onClick={() => navigate("/register")}>S'inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
