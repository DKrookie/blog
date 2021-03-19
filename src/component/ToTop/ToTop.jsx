import React from "react";

export default function ToTop(props) {
  return (
    <div
      className={`to-top iconfont icon-backtotop ${
        props.windowScrollYFlag ? "" : "to-top-hide"
      }`}
      onClick={props.toTop}
    ></div>
  );
}
