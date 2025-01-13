class AuthService {
  private currentUser: string | null = null;

  constructor() {
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }

  register(email: string, password: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Adresse email invalide.");
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const emailExists = users.some(
      (user: { email: string }) => user.email === email
    );
    if (emailExists) {
      throw new Error("Cette adresse email est déjà utilisée.");
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    this.currentUser = email;
    return true;
  }

  logout(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}

export default new AuthService();
