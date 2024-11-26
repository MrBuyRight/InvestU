import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Dashboard from './Components/Dashboard';
import Questionnaire from './Components/Questionnaire';
import './App.css';
import './styles/Dashboard.css';
import './styles/Navigation.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Navigation user={user} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Questionnaire onComplete={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
