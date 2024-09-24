import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AnimeLista from './components/AnimeLista/AnimeLista';

function App() {
  return (
    <div className="App">
      <Header />
      <AnimeLista />
      <Footer />
    </div>
  );
}

export default App;
