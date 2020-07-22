import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-post`, {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((result) => {
        // console.log(result);
        setData(result.data.post);
      });
  }, []);

  const likePost = (id) => {
    let user = {
      postId: id,
    };
    axios
      .put(`http://localhost:5000/like`, user, {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((result) => {
        console.log(result.data._id);
        //   const newData = data.map((item) => {
        //     console.log(item);
        //     if (item._id === result.data._id) {
        //       return result;
        //     } else {
        //       return item;
        //     }
        //   });
      })
      .catch((err) => console.log(err));
  };
  const unlikePost = (id) => {
    let user = {
      postId: id,
    };
    axios
      .put(`http://localhost:5000/unlike`, user, {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const makeComment = (text, postId) => {
    let user = {
      postId,
      text,
    };
    axios
      .put(`http://localhost:5000/comment`, user, {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const deletePost = (postId) => {
    axios
      .delete(`/delete-post/${postId}`, {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="home ">
        {data.map((item) => {
          return (
            <div className="card home-card" key={item._id}>
              <h5>{item.postedby.name}</h5>
              <i
                className="material-icons"
                onClick={() => unlikePost(item._id)}
              >
               delete
              </i>
              <div className="card-image">
                <img src={item.photo} alt="" />
              </div>
              <div className="card-content">
                <i className="material-icons heart-icon">favorite</i>
                {item.likes.includes(state._id) ? (
                  <i
                    className="material-icons"
                    onClick={() => unlikePost(item._id)}
                  >
                    thumb_down
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    onClick={() => likePost(item._id)}
                  >
                    thumb_up
                  </i>
                )}

                <h6>{item.likes.length} likes</h6>
                <h5>{item.title}</h5>
                <p>{item.body}</p>
                {console.log(item.comments)}
                {item.comments.map((record) => {
                  return (
                    <h6>
                      <span>
                        <em>{record.postedby.name + ":"}</em>
                      </span>
                      {record.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder="Add a comment" />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
