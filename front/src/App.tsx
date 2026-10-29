import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import './styles/home.css';
import './App.css';

function App() {
  // return <HomePage />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
