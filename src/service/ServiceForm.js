import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
function ServiceForm({ handleSubmit, btnTxt, projectData }) {
  const [service, setService] = useState([]);

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <Input
          type="text"
          text="Nome do serviço"
          name="name"
          placeholder="Insira o nome do serviço"
          handleOnChange={handleChange}
        />
        <Input
          type="number"
          text="Custo do serviço"
          name="cost"
          placeholder="Insira o custo do serviço"
          handleOnChange={handleChange}
        />
        <Input
          type="text"
          text="Descrição do serviço"
          name="description"
          placeholder="Descreva o serviço"
          handleOnChange={handleChange}
        />
        <SubmitButton text={btnTxt} />
      </form>
    </div>
  );
}
export default ServiceForm;
