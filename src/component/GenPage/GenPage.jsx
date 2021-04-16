import React from "react";
import { Link } from "react-router-dom";

export default function GenPage(props) {
  let sumPage = Math.ceil(props.total / props.pageSize) || 1,
    currentPage = Number(props.currentPage) || 1;
  currentPage = currentPage > sumPage ? sumPage : currentPage;
  function toTop() {
    window.scrollTo(0, 0);
  }
  return (
    <nav className="page-nav">
      <div>{currentPage}</div>
      <Link
        to={`/page/${currentPage - 1}`}
        className={`${currentPage <= 1 ? "hide" : ""} prev `}
        onClick={toTop}
      >
        上一页
      </Link>
      <Link
        to={`/page/${currentPage + 1}`}
        className={`${currentPage === sumPage ? "hide" : ""} next`}
        onClick={toTop}
      >
        下一页
      </Link>
    </nav>
  );
}
