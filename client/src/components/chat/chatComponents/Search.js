import React from "react";
import "../chat.css";
export default function Search() {
  return (
    <div className="chat-search-box">
      <div className="input-group">
        <input className="form-control" placeholder="Search" />
        <div className="input-group-btn">
          <button type="button" className="btn btn-info">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
