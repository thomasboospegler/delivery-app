import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" />
      </Switch>
    </div>
  );
}

export default App;
