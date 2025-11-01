import React from "react";
import "./Layout.css"; // Import du style
import NavB from "./NavB";
import Dash from "./Dash";

const Layout = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <NavB />
      </aside>

      {/* Contenu principal */}
      <main className="main-content">
        <Dash />
      </main>
    </div>
  );
};

export default Layout;
