import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importa os componentes Header, Footer e AnimeLista
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AnimeLista from "./components/AnimeLista/AnimeLista";

function App() {
  return (
    <div className="App">
      {/* Renderiza o cabeçalho da aplicação */}
      <Header />
      <div className="container-fluid ">
        {/* Renderiza a lista de animes */}
        <AnimeLista />
      </div>
      {/* Renderiza o rodapé da aplicação */}
      <Footer />
    </div>
  );
}

// Exporta o componente App para uso em outros arquivos
export default App;