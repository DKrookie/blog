import React from "react";
import { Link } from "react-router-dom";

export default function GenPage(props) {
  let sumPage = Math.ceil(props.total / props.pageSize),
    currentPage = Number(props.currentPage) || 1;
  currentPage = currentPage > sumPage ? sumPage : currentPage;
  return (
    <nav className="page-nav">
      <div>{currentPage}</div>
      <Link
        to={`/page/${currentPage - 1}`}
        className={`${currentPage == 1 ? "hide" : ""} prev `}
      >
        上一页
      </Link>
      <Link
        to={`/page/${currentPage + 1}`}
        className={`${currentPage == sumPage ? "hide" : ""} next`}
      >
        下一页
      </Link>
    </nav>
  );
}
