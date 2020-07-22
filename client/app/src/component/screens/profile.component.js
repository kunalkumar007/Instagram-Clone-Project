import React, { useEffect,useState,useContext } from "react";
import axios from "axios";
import {userContext} from "../../App"

export default function Profile() {
  const [mypics,setMypics]=useState([]);
  const {state,dispatch} = useContext(userContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-post`, {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => setMypics(res.data.myPosts));
  }, []);
  return (
    <React.Fragment>
      <div className="profile">
        <div className="left-profile">
          <div>
            <img
              src="https://images.unsplash.com/photo-1584202532967-6390de14ecac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              className="circle profile-img"
              alt="Profile Pic"
            />
          </div>
          <div>
            <h4>{state?state.name:"loading..."}</h4>
            <div className="profile-initials">
              <h6>40 Posts</h6>
              <h6>40 Followers</h6>
              <h6>40 Following</h6>
            </div>
          </div>
        </div>
        <div className="profile-gallery">
        {
          mypics.map(item=>{
            return (
              <img
                src={item.photo}
                alt={item.title}
                className="gallery-item"
                key={item._id}
              />
            );
          })
        }
         
          <img
            src="https://images.unsplash.com/photo-1584202532967-6390de14ecac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="gallery item"
            className="gallery-item"
          />
          <img
            src="https://images.unsplash.com/photo-1584202532967-6390de14ecac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="gallery item"
            className="gallery-item"
          />
          <img
            src="https://images.unsplash.com/photo-1584202532967-6390de14ecac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="gallery item"
            className="gallery-item"
          />
          <img
            src="https://images.unsplash.com/photo-1584202532967-6390de14ecac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="gallery item"
            className="gallery-item"
          />
        </div>
      </div>
    </React.Fragment>
  );
}
