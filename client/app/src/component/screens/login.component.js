import React, { useState,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {userContext} from "../../App"
import axios from "axios";
import M from "materialize-css";

export default function Login() {
  const {state,dispatch}=useContext(userContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  const PostData = () => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //regex for checking email ...
    if (!re.test(email))
      return M.toast({
        html: "Invalid Email",
        classes: "#6a1b9a purple darken-1",
      });
    //post using axios ...
    axios
      .post("http://localhost:5000/login", {
        password,
        email,
      })
      .then((res) => {
        console.log(res.data.token);
        console.log(res.data.user);
        // save the tokens in local items ...
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch({type:"USER",payload:res.data.user})
        history.push("/"); //redirect using useHistory();
      })
      .catch((err) => {
        console.log(err);
        M.toast({
          html: err.response.data, //finding error
          classes: "#6a1b9a purple darken-3",
        });
      });
  };
  return (
    <React.Fragment>
      <div className="card-parent container center">
        <div className="card input-field">
          <h2>Instagram</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn waves-effect waves-light  blue lighten-1"
            onClick={() => PostData()}
          >
            Sign in
          </button>
          <p>
            <Link to="/signup">Want to Create a Account ?</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
