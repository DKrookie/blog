import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import "./Sidebar.scss";

function Sidebar(props) {
  if (!props.tags) {
    return <div></div>;
  }
  function go(url) {
    props.history.push(url);
    window.location.reload();
  }
  const postTags = props.tags.map((tag) => {
    return (
      <div key={tag.tagName}>
        <div className="tag-name">{tag.tagName}</div>
        <ul className="year-list">
          {tag.files.map((file) => {
            return (
              <li className="tags-post-item" key={file.filename}>
                <span className="tags-post-date">{file.birthTime}</span>
                <span
                  onClick={() => {
                    go(`/a/${file.filename}`);
                  }}
                  className="tags-post-title"
                >
                  {file.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
  return (
    <>
      <ul className={`sidebar-tabs`}>
        <li className="sidebar-tabs-tags">
          <span className="iconfont icon-tags"></span>
          <span className="tab-name">tags</span>
        </li>
      </ul>
      <div className={`sidebar-content`}>
        <div className="sidebar-content-tags">
          <div className="post-tags">{postTags}</div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { tags } = state;
  return { tags };
};

export default connect(mapStateToProps)(withRouter(Sidebar));
