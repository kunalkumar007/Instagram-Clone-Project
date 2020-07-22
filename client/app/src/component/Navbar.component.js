import React,{useContext} from "react";
import { NavLink,useHistory } from "react-router-dom";
import {userContext} from "../App";

const Navbar = () => {
  const {state,dispatch}=useContext(userContext);
  const history=useHistory();
  const renderList=()=>{
    if(state){
      return [
        <li>
          <NavLink to="/create-post">Create</NavLink>
        </li>,
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>,
        <li>
           <button
            className="btn #c62828 red darken-3"
            onClick={() =>{
              localStorage.clear();
              dispatch({type:"CLEAR"});
              history.push("/login");
            } 
            }
          >
            Log Out
          </button>
        </li>
        
      ];
    }else{
      return [
        <li>
              <NavLink to="/login">Login</NavLink>
            </li>,
            <li>
              <NavLink to="/signup">SignUp</NavLink>
            </li>
      ]
    }
  }
  return (
    <div>
      <nav className="grey darken-4">
        <div className="nav-wrapper container">
          <NavLink to={state?"/":"/login"} className="brand-logo">
            Instagram
          </NavLink>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
