import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Hello from './pages/Hello';
import Menu from './components/Menu';

// let localStorage = window.localStorage;
// const token = localStorage.getItem('token');
// console.log(token);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* {!token} ? <Login /> : */}
    <Router>
      <Menu />
      <Route exact path="/">
        <Hello />
      </Route>
    </Router>
  </React.StrictMode>,
);

