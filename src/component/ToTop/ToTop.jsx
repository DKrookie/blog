import React from "react";

import "./ToTop.scss";

export default function ToTop(props) {
  let timer = null;
  function toTop() {
    timer = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(timer);
      }
      window.scrollTo(0, window.scrollY - 100);
    }, 10);
  }
  return (
    <div
      className={`to-top iconfont icon-backtotop ${
        props.windowScrollYFlag ? "" : "to-top-hide"
      }`}
      onClick={toTop}
    ></div>
  );
}
