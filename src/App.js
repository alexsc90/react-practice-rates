import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CurrenciesRates from './components/CurrenciesRates';
import Header from './components/Header'
import Sidebar from './components/Sidebar'


function App() {
  return (

    <>
      <Router>
        <Header />
        <Sidebar />

        <Switch>
          <Route exact path="/:currency" component={CurrenciesRates} />
        </Switch>
      </Router>
    </>
  
  );
}

export default App;
