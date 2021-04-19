import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Articles.scss";

function Articles(props) {
  if (!props.articles) {
    return <article className="post"></article>;
  }
  let { articles, pageSize, currentPage } = props,
    articlesArr = [],
    start = pageSize * (currentPage - 1),
    end =
      articles.length > pageSize * currentPage
        ? pageSize * currentPage
        : articles.length;
  for (let i = start; i < end; i++) {
    let tag = [];
    for (let j = 0; j < articles[i].tags.length; j++) {
      tag.push(
        <span className="post-tag" to="/" key={articles[i].tags[j]}>
          {articles[i].tags[j]}
        </span>
      );
    }
    articlesArr.push(
      <div key={articles[i].filename}>
        <Link to={`/a/${articles[i].filename}`} className="abstract-title">
          {articles[i].title}
        </Link>
        <div className="abstract-content">
          <hr />
          <p>
            {articles[i].desc}
          </p>
        </div>
        <div className="abstract-meta">
          <div className="abstract-date">
            <span className="iconfont icon-inbox-calander"></span>
            <span className="abstract-time">{articles[i].birthTime}</span>
          </div>
          <div className="abstract-tags">{tag}</div>
        </div>
      </div>
    );
  }
  return <article className="post">{articlesArr}</article>;
}

const mapStateToProps = (state) => {
  const { articles, pageSize, currentPage } = state;
  return { articles, pageSize, currentPage };
};

export default connect(mapStateToProps)(Articles);
