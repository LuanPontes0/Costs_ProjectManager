import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
} from "react-icons/fa";
function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li className={styles.itens}>
          <FaFacebook />
        </li>
        <li className={styles.itens}>
          <FaInstagram />
        </li>
        <li className={styles.itens}>
          <FaLinkedinIn />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Costs</span>&copy;
      </p>
    </footer>
  );
}
export default Footer;
