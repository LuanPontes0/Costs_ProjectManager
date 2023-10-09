import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import styles from "./NovoProjeto.module.css";
function NovoProjeto() {
  const navigate = useNavigate();

  function createPost(project) {
    let mensagem = "Projeto criado com sucesso!";
    //Initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projetos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => navigate("/projetos", { state: { mensagem } }))
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.novo_projeto_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} buttonText="Criar Projeto" />
    </div>
  );
}
export default NovoProjeto;
