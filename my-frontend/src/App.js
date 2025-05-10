import React, { useState } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Importing React Router
import WelcomePage from './components/Welcomepage';
import HomePage from './pages/Home';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Router>
      <div className="app-container">
        <Switch>
          {/* Route for Welcome Page */}
          <Route path="/" exact>
            <WelcomePage />
          </Route>

          {/* Route for Home Page */}
          <Route path="/home" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
