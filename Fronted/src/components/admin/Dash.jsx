import React from "react";

const Dash = () => {
  return (
    <div className="container-fluid page-body-wrapper">
      <div id="right-sidebar" className="settings-panel">
        <i className="settings-close fa fa-times"></i>
        <ul className="nav nav-tabs" id="setting-panel" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
          </li>
        </ul>
      </div>

      <div className="main-panel">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">Dashboard</h3>
          </div>
          <div className="row grid-margin">
            <div className="col-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                    {/* Dashboard stats here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Dash;
