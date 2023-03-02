import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import Provider from './context/Provider';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
