import React, { useContext } from "react";
import PropTypes from "prop-types";
import SearchForm from "./SearchForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
export default function Navbar(props) {
  let location = useLocation();
  const {showAlert}=useContext(NoteContext);
  const navigate=useNavigate();
const handelSignOut=()=>{
  localStorage.clear();
  navigate('/login');
  showAlert('Signed Out','success');
}
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme={props.mode}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.path === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.path === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <SearchForm />
          <div className="form-check form-switch mx-3">
            <input
              className="form-check-input"
              onClick={props.toggleMode}
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
              style={{ color: props.mode === "light" ? "black" : "white" }}
            >
              {props.mode.charAt(0).toUpperCase() + props.mode.substring(1)}{" "}
              Mode
            </label>
          </div>
          {!localStorage.getItem('token')?<div>
          <Link className={`nav-link`} to="/login">
            <button type="button" className="btn btn-secondary mx-2">
              Login
            </button>
          </Link>

          <Link className={`nav-link`} to="/signup">
            <button type="button" className="btn btn-secondary mx-2">
              SignUp
            </button>
          </Link>
          </div>:
          <button type="button" className="btn btn-secondary mx-2" onClick={handelSignOut}>
            SignOut
          </button>
          }
        </div>
      </div>
    </nav>
  );
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

// Navbar.defaultProps={title: "Title here",
//     about: "About here"
//  }
