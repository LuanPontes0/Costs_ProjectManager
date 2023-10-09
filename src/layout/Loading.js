import styles from "./Loading.module.css";
import loadingImg from "../img/loading.svg";
function Loading() {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={loadingImg} alt="" />
    </div>
  );
}
export default Loading;
