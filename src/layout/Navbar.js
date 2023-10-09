import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Navbar.module.css";
import logo from "../img/costs_logo.png";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to={"/"}>
          <img className={styles.logo} src={logo} alt="costs" />
        </Link>
        <ul>
          <li>
            <Link className={styles.link} to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={"/projetos"}>
              Projetos
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={"/empresa"}>
              Empresa
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={"/contato"}>
              Contato
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
export default Navbar;
