import React from "react";

import "./SidebarTabs.scss";

export default function SidebarTabs() {
  return (
    <ul className={`sidebar-tabs`}>
      <li className="sidebar-tabs-tags">
        <span className="iconfont icon-tags"></span>
        <span className="tab-name">tags</span>
      </li>
    </ul>
  );
}
