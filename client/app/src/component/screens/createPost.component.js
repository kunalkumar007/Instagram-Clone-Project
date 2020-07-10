import React, { useState, useEffect } from "react";
import axios from "axios";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (url) {
      //post using axios ...
      axios
        .post(
          "http://localhost:5000/create-post",
          {
            title,
            body,
            url,
          },
          {
            headers: {
              auth_token: localStorage.getItem("auth_token"),
            },
          }
        )
        .then((data) => {
          console.log(data);

          history.push("/"); //redirect using useHistory();
        })
        .catch((err) => {
          console.log(err.response);
          M.toast({
            html: err.response.data, //finding error
            classes: "#6a1b9a purple darken-3",
          });
        });
    }
  }, [body, history, title, url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "kunal-img");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/kunal-img/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <div className="card input-field create-post-card">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn waves-effect waves-light blue darken-2">
            <span>Upload</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />{" "}
            {/* uploads the image ... */}
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light  blue darken-2"
          onClick={() => postDetails()}
        >
          Submit Post
        </button>
      </div>
    </React.Fragment>
  );
}
