import React from "react";

export default function Header(props) {
  return (
    <header className={`header ${props.menuClickFlag ? "header-active" : ""}`}>
      <div
        className={`iconfont icon-menu-shou ${
          props.menuClickFlag ? "icon-menu-shou-active" : ""
        } ${props.windowScrollYFlag ? "icon-menu-shou-black" : ""}`}
        onClick={props.menuClickHandle}
      ></div>
      <a
        className={`home-link ${
          props.windowScrollYFlag ? "home-link-hide" : ""
        }`}
        href="/"
      >
        dk's Blog
      </a>
    </header>
  );
}
