import React from "react";

export default function Profile() {
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
            <h4>Ramesh Verma</h4>
            <div className="profile-initials">
              <h6>40 Posts</h6>
              <h6>40 Followers</h6>
              <h6>40 Following</h6>
            </div>
          </div>
        </div>
        <div className="profile-gallery">
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
