import React,{useEffect,createContext,useReducer, useContext} from 'react';
import './App.css';
import Navbar from './component/Navbar.component';
import {BrowserRouter as Router , Route,useHistory } from "react-router-dom"; 
import "./App.css";
import Home from './component/screens/home.component';
import Profile from './component/screens/profile.component';
import Login from './component/screens/login.component';
import SignUp from './component/screens/signup.component';
import CreatePost from './component/screens/createPost.component';
import {reducer,initialState} from "./reducers/user.reducer";

export const userContext=createContext();
const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(userContext);

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({type:"USER",payload:user});
      history.push("/");
    }else{
      history.push("/login")
    }
  },[])
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/create-post" component={CreatePost} />
    </>
  );
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </userContext.Provider>
  );
}

export default App;
