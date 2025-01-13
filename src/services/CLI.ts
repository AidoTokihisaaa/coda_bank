import prompts from "prompts";

export class CLI {
  public async menu() {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Que voulez-vous faire ?",
      choices: [
        { title: "Créer un compte", value: "create" },
        { title: "Se connecter", value: "login" },
        { title: "Quitter", value: "quit" },
      ],
    });

    switch (response.action) {
      case "create":
        console.log("Création d'un compte...");
        break;
      case "login":
        console.log("Connexion...");
        break;
      case "quit":
        console.log("Au revoir !");
        process.exit(0);
    }
  }
}
