import React from 'react';
import './App.css';
import Navbar from './component/Navbar.component';
import {BrowserRouter as Router , Route } from "react-router-dom"; 
import "./App.css";
import Home from './component/screens/home.component';
import Profile from './component/screens/profile.component';
import Login from './component/screens/login.component';
import SignUp from './component/screens/signup.component';
import CreatePost from './component/screens/createPost.component';


function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/create-post" component={CreatePost} />
    </Router>
  );
}

export default App;
