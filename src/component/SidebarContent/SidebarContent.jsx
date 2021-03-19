import React from "react";
import { Link } from "react-router-dom";

export default function SidebarContent(props) {
  return (
    <div className={`sidebar-content`}>
      <div className="sidebar-content-tags">
        <div className="post-tags">
          {props.tags.map((ele) => {
            return (
              <div key={ele.tagName}>
                <div className="tag-name">{ele.tagName}</div>
                <ul className="year-list">
                  {ele.files.map((ele) => {
                    ele = ele.split(" ");
                    return (
                      <li className="tags-post-item" key={ele[0]}>
                        <span className="tags-post-date">{ele[1]}</span>
                        <Link to={`/a/${ele[0]}`} className="tags-post-title">
                          {ele[3]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
