import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

export default function SignUp() {
  const [name, setName] = useState("");
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
      .post("http://localhost:5000/signup", {
        name,
        password,
        email,
      })
      .then((data) => {
        history.push("/login"); //redirect using useHistory();
      })
      .catch((err) => {
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
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Sign Up
          </button>
          <p>
            <Link to="/login">Already Have a Account ?</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
