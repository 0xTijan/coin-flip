import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<h1>Missing Page!</h1>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
