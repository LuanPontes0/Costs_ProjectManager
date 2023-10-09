import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
function ProjectCard({ name, orcamento, categoria, id, key, handleRemove }) {
  //Passa o id para a função HandleRemove
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.card_container}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span>
        R${orcamento}
      </p>
      <p>
        <span
          className={`${styles.categoria_bolinha} ${
            styles[categoria.toLowerCase()]
          }`}
        ></span>
        {categoria}
      </p>
      <div className={styles.botoes}>
        <Link to={`/projeto/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}
export default ProjectCard;
