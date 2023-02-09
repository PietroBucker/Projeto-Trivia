import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
<<<<<<< HEAD
<<<<<<< HEAD
      <Route exact path="/perguntas" component={ Perguntas } />
=======
=======
      <Route path="/game" component={ Game } />
>>>>>>> a65dd9dd9f3f7cee89766d983ec330a4cb35cb87
      <Route path="/settings" component={ Settings } />
>>>>>>> ac70d8d8d45aeb08652faf2b9dffa7ab877bb485
    </Switch>
  );
}
