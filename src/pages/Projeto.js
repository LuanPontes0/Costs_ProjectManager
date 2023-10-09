import styles from "./Projeto.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
function Projeto() {
  //states
  const [projeto, setProjeto] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjetoForm, setShowProjetoForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  //Params
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projetos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjeto(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 300);
  });

  function toggleProjetoForm() {
    setShowProjetoForm(!showProjetoForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function editarProjeto(projeto) {
    setMessage("");

    if (projeto.orcamento < projeto.cost) {
      setMessage(
        "O orçamento total não pode ser menor que o custo do projeto atual!"
      );
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projetos/${projeto.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjeto(data);
        setShowProjetoForm(!showProjetoForm);
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function addService() {
    setMessage("");

    const lastService = projeto.services[projeto.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(projeto.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(projeto.orcamento)) {
      setMessage(
        "Valor do serviço ultrapassa o valor do orçamento do projeto!"
      );
      setType("error");
      projeto.services.pop();
      return false;
    }
    projeto.cost = newCost;

    fetch(`http://localhost:5000/projetos/${projeto.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjeto(data);
        setShowServiceForm(false);
        setMessage("Serviço adicionado com sucesso");
        setType("success");
      })
      .catch((err) => {
        console.log(err);
        console.log(projeto);
      });
  }

  function serviceRemove(id, cost) {
    setMessage("");

    const servicesUpdated = projeto.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = projeto;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projetos/${projectUpdated.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjeto(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {projeto.name ? (
        <div className={styles.projeto_container}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.projeto_detalhes}>
              <h1>Projeto: {projeto.name}</h1>
              <button className={styles.btn} onClick={toggleProjetoForm}>
                {!showProjetoForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjetoForm ? (
                <div className={styles.projeto_info}>
                  <p>
                    <span>Categoria:</span> {projeto.categoria.nome}
                  </p>
                  <p>
                    <span>Total Orçamento: R$</span> {projeto.orcamento}
                  </p>
                  <p>
                    <span>Total Utilizado: R$</span> {projeto.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projeto_info}>
                  <ProjectForm
                    handleSubmit={editarProjeto}
                    projectData={projeto}
                    buttonText="Concluir Edição"
                  />
                </div>
              )}
            </div>
            <div className={styles.servicos_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              {showServiceForm && (
                <div className={styles.projeto_info}>
                  <ServiceForm
                    handleSubmit={addService}
                    btnTxt={"Criar serviço"}
                    projectData={projeto}
                  />
                </div>
              )}
            </div>
            <Container customClass="start">
              <div className={styles.service_cards_container}>
                {services.length > 0 && (
                  <>
                    {services.map((service) => (
                      <ServiceCard
                        id={service.id}
                        name={service.name}
                        description={service.description}
                        cost={service.cost}
                        key={service.id}
                        handleRemove={serviceRemove}
                      />
                    ))}
                  </>
                )}
                {services.length === 0 && (
                  <p>Não há serviços cadastrados neste projeto.</p>
                )}
              </div>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Projeto;
