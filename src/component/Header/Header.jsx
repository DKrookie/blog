import React from "react";
import { connect } from "react-redux";

import "./Header.scss";

function Header(props) {
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

const mapStateToProps = (state) => {
  const { windowScrollYFlag, menuClickFlag } = state;
  return { windowScrollYFlag, menuClickFlag };
};

export default connect(mapStateToProps)(Header);
