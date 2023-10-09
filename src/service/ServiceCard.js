import styles from "../project/ProjectCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, cost, description, handleRemove }) {
  function remove(e) {
    e.preventDefault();
    handleRemove(id, cost);
    return;
  }
  return (
    <div className={styles.card_container}>
      <h4>{name}</h4>
      <p>
        <span>Custo: </span>
        R${cost}
      </p>
      <p>Descrição: {description}</p>
      <div className={styles.botoes}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}
export default ServiceCard;
