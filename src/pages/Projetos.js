import Message from "../layout/Message";
import Linkbutton from "../layout/LinkButton";
import { useLocation } from "react-router-dom";
import styles from "./Projetos.module.css";
import Container from "../layout/Container";
import { useEffect, useState } from "react";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  //Remove um projeto pelo id
  function removeProjeto(id) {
    fetch(`http://localhost:5000/projetos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json)
      .then(() => {
        setProjetos(projetos.filter((projeto) => projeto.id !== id));
        setDeleteMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  //Carrega os projetos na pagina
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projetos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjetos(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  let mensagem = "";
  const location = useLocation();
  if (location.state) {
    mensagem = location.state.mensagem;
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <Linkbutton text="Novo Projeto" to="/novoprojeto" />
      </div>
      <div className={styles.msg}>
        {mensagem && <Message msg={mensagem} type="success" />}
        {deleteMessage && <Message msg={deleteMessage} type="success" />}
      </div>
      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjectCard
              name={projeto.name}
              orcamento={projeto.orcamento}
              categoria={projeto.categoria.nome}
              id={projeto.id}
              key={projeto.id}
              handleRemove={removeProjeto}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projetos.length === 0 && (
          <p>Você ainda não tem projetos !</p>
        )}
      </Container>
    </div>
  );
}
export default Projetos;
