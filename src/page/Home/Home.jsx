import React, { Component } from "react";
import { connect } from "react-redux";

import "./Home.scss";

import Header from "../../component/Header/Header";
import Title from "../../component/Title/Title";
import Sidebar from "../../component/Sidebar/Sidebar";
import ToTop from "../../component/ToTop/ToTop";
import Articles from "../../component/Articles/Articles";
import Page from "../../component/GenPage/GenPage";
import Profile from "../../component/Profile/Profile";
import { change_menu_click_flag_action } from "../../store/action";

class Home extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  ClickAndRemove = () => {
    this.props.change_menu_click_flag();
    this.wrapper.current.removeEventListener("click", this.ClickAndRemove);
  };

  menuClickHandle = () => {
    let { menuClickFlag } = this.props;
    if (!menuClickFlag) {
      this.wrapper.current.addEventListener("click", this.ClickAndRemove);
    } else {
      this.wrapper.current.removeEventListener("click", this.ClickAndRemove);
    }
    this.props.change_menu_click_flag();
  };

  render() {
    return (
      <div id="Home">
        <Header menuClickHandle={this.menuClickHandle} />
        <div
          className={`wrapper ${
            this.props.menuClickFlag ? "wrapper-active" : ""
          }`}
          ref={this.wrapper}
        >
          <Title title={this.props.title} />
          <div className="container">
            <Profile />
            <main className="articles">
              <Articles />
              <Page />
            </main>
          </div>
        </div>
        <div
          className={`sidebar ${
            this.props.menuClickFlag ? "sidebar-active" : ""
          }`}
        >
          <Sidebar />
        </div>
        <ToTop windowScrollYFlag={this.props.windowScrollYFlag} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile, menuClickFlag, windowScrollYFlag } = state;
  return {
    menuClickFlag,
    windowScrollYFlag,
    title: profile && profile.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change_menu_click_flag: () => {
      dispatch(change_menu_click_flag_action());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
