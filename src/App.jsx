import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Portfolio from './Portfolio';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  )
}

export default App
