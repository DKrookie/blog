import React from "react";

export default function GenPage(props) {
  let currentPage = props.currentPage || 1,
    sumPage = Math.ceil(props.total / props.pageSize),
    pageRender = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1 || i > sumPage) {
      continue;
    } else if (i === currentPage) {
      pageRender.push(
        <span key={i} className="page-number current">
          {currentPage}
        </span>
      );
      continue;
    }
    pageRender.push(
      <a key={i} className="page-number" href="/">
        {i}
      </a>
    );
  }
  if (currentPage - 3 === 1) {
    pageRender.unshift(
      <a key="1" className="page-number" href="/">
        1
      </a>
    );
  } else if (currentPage - 3 > 1) {
    pageRender.unshift(
      <a key="prev-more" className="page-number" href="/">
        …
      </a>
    );
    pageRender.unshift(
      <a key="1" className="page-number" href="/">
        1
      </a>
    );
  }
  if (currentPage + 3 === sumPage) {
    pageRender.push(
      <a key={sumPage} className="page-number" href="/">
        {sumPage}
      </a>
    );
  } else if (currentPage + 3 < sumPage) {
    pageRender.push(
      <a key="next-more" className="page-number" href="/">
        …
      </a>
    );
    pageRender.push(
      <a key={sumPage} className="page-number" href="/">
        {sumPage}
      </a>
    );
  }
  if (currentPage !== 1) {
    pageRender.unshift(
      <a key="prev" href="/" className="prev">
        {"<PREV"}
      </a>
    );
  }
  if (currentPage !== sumPage && sumPage > 20) {
    pageRender.push(
      <a key="next" href="/" className="next">
        {"NEXT>"}
      </a>
    );
  }
  return <nav className="page-nav">{pageRender}</nav>;
}
