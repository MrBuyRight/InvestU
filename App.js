import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Dashboard from './Components/Dashboard';
import Questionnaire from './Components/Questionnaire';
import './styles/Dashboard.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Navigation user={user} />
        <Routes>
          <Route path="/" element={<Questionnaire onComplete={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
