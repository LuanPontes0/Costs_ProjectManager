import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Empresa from "./pages/Empresa";
import Container from "./layout/Container";
import Projetos from "./pages/Projetos";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import NovoProjeto from "./pages/NovoProjeto";
import Projeto from "./pages/Projeto";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container customClass="min_height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/novoprojeto" element={<NovoProjeto />} />
          <Route path="/projeto/:id" element={<Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
