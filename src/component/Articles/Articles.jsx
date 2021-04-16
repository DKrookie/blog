import React from "react";
import { Link } from "react-router-dom";

export default function Articles(props) {
  let articles = [];
  let start = props.pageSize * (props.currentPage - 1);
  let end =
    props.articles.length > props.pageSize * props.currentPage
      ? props.pageSize * props.currentPage
      : props.articles.length;
  for (let i = start; i < end; i++) {
    let ele = props.articles[i].split("*=*");
    let tmp = ele[1].split(" ");
    let tag = [];
    for (let i = 0; i < tmp.length; i++) {
      tag.push(
        <span className="post-tag" to="/" key={ele[i]}>
          {tmp[i]}
        </span>
      );
    }
    articles.push(
      <div key={ele[4]}>
        <Link to={`/a/${ele[4]}`} className="abstract-title">
          {ele[0]}
        </Link>
        <div className="abstract-content">
          <hr />
          <p>
            这是一个由有条件的任意用户登录+低权限文件上传+低权限目录穿越+低权限文件包含组成。可能是盯着国内OA的人太多了，这个漏洞在2020年9月28号的11.8版本中被更新修复，比较可惜的是，一次更新修复了全部的漏洞逻辑，不禁令人惊叹。
          </p>
        </div>
        <div className="abstract-meta">
          <div className="abstract-date">
            <span className="iconfont icon-inbox-calander"></span>
            <span className="abstract-time">{ele[2]}</span>
          </div>
          <div className="abstract-tags">{tag}</div>
        </div>
      </div>
    );
  }
  return <article className="post">{articles}</article>;
}
