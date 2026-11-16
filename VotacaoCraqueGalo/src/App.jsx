import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Home />
      <footer className="rodape">DIAW 2026, PUC Minas</footer>
    </BrowserRouter>
  );
}

export default App;
