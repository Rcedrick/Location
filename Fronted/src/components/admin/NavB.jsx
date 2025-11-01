import React from "react";

const NavB = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-left">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="images/logo.svg" alt="logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Location</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Client</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Paiement</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Deconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavB;
