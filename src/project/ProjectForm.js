import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";

function ProjectForm({ handleSubmit, buttonText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [projeto, setProjeto] = useState(projectData || []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(projeto);
  };

  function handleChange(e) {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProjeto({
      ...projeto,
      categoria: {
        id: e.target.value,
        nome: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  useEffect(() => {
    fetch("http://localhost:5000/categorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <form onSubmit={submit}>
        <Input
          text="Nome do projeto:"
          type="text"
          placeholder="Insira o nome do projeto"
          name="name"
          handleOnChange={handleChange}
          value={projeto.name}
        />
        <Input
          text="Orçamento do projeto:"
          type="number"
          placeholder="Insira o orçamento total"
          name="orcamento"
          handleOnChange={handleChange}
          value={projeto.orcamento}
        />
        <Select
          text="Selecione a categoria"
          name="categoria"
          options={categories}
          handleOnChange={handleCategory}
          value={projeto.categoria ? projeto.categoria.id : ""}
        />
        <SubmitButton text={buttonText} />
      </form>
    </>
  );
}
export default ProjectForm;
