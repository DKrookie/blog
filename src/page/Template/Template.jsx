import React, { Component } from "react";

import Header from "../../component/Header/Header";
import Title from "../../component/Title/Title";
import SidebarTabs from "../../component/SidebarTabs/SidebarTabs";
import SidebarContent from "../../component/SidebarContent/SidebarContent";
import ToTop from "../../component/ToTop/ToTop";

import "./Template.scss";

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClickFlag: false,
      windowScrollYFlag: false,
      sidebar: 0,
    };
    this.wrapper = React.createRef();
  }
  componentDidMount() {
    window.onscroll = () => {
      if (
        window.scrollY > window.innerHeight / 2 &&
        !this.state.windowScrollYFlag
      ) {
        this.setState({
          windowScrollYFlag: !this.state.windowScrollYFlag,
        });
      } else if (
        window.scrollY <= window.innerHeight / 2 &&
        this.state.windowScrollYFlag
      ) {
        this.setState({
          windowScrollYFlag: !this.state.windowScrollYFlag,
        });
      }
    };
  }

  menuClickHandle = () => {
    let { menuClickFlag } = this.state;
    menuClickFlag = !menuClickFlag;
    if (menuClickFlag) {
      this.wrapper.current.addEventListener(
        "click",
        this.changeMenuClickFlag.bind(this, false)
      );
    } else {
      this.wrapper.current.removeEventListener(
        "click",
        this.changeMenuClickFlag
      );
    }
    this.changeMenuClickFlag(menuClickFlag);
  };
  changeMenuClickFlag = (menuClickFlag) => {
    this.setState({
      menuClickFlag,
    });
  };
  sidebarTabsClickHandle = (sidebar) => {
    this.setState({
      sidebar,
    });
  };
  toTop = () => {
    this.timer = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(this.timer);
      }
      window.scrollTo(0, window.scrollY - 100);
    }, 10);
  };
  render() {
    return (
      <div id="Home">
        <Header
          menuClickFlag={this.state.menuClickFlag}
          windowScrollYFlag={this.state.windowScrollYFlag}
          menuClickHandle={this.menuClickHandle}
        />
        <div
          className={`wrapper ${
            this.state.menuClickFlag ? "wrapper-active" : ""
          }`}
          ref={this.wrapper}
        >
          <Title title={this.props.title} />
          <div className="container">{this.props.component}</div>
        </div>
        <div
          className={`sidebar ${
            this.state.menuClickFlag ? "sidebar-active" : ""
          }`}
        >
          <SidebarTabs
            sidebar={this.state.sidebar}
            sidebarTabsClickHandle={this.sidebarTabsClickHandle}
          />
          <SidebarContent
            sidebar={this.state.sidebar}
            articles={this.props.articles}
            tags={this.props.tags}
          />
        </div>
        <ToTop
          windowScrollYFlag={this.state.windowScrollYFlag}
          toTop={this.toTop}
        />
      </div>
    );
  }
}
