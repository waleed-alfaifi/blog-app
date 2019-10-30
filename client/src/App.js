import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddPost from './components/AddPost';
import ViewPost from './components/ViewPost';
import Profile from './components/Profile';

import './App.css';

function App() {
  let token = localStorage.getItem('token');
  axios.defaults.headers.common = { Authorization: token };

  return (
    <Router>
      <div>
        <Header />
        <div className="mt-4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/posts/add" component={AddPost} />
            <Route path="/posts/view/:id" component={ViewPost} />
            <Route path="/user/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
