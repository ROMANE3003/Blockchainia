
import React from 'react';
import Navbar from './components/Navbar';
import './Dapp.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/About';
import SignUp from './components/pages/SignUp';
import Glossaire from './components/pages/Glossaire';
import About from './components/pages/About';

function Dapp() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/glossaire' component={Glossaire} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default Dapp;