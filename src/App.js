import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

import Home from "./page/Home/Home";
import Show from "./page/Show/Show";
import About from "./page/About/About";
import {
  save_all_action,
  change_window_scroll_flag_action,
} from "./store/action";

import "./App.scss";

class App extends Component {
  componentDidMount() {
    Axios.get("/api/all").then((result) => {
      if (result.data.status) {
        let tmp = {articles: [],tags: [],};
        result.data.result.articles.forEach((ele) => {
          ele = ele.split("*=*");
          tmp.articles.push({title: ele[0],tags: ele[1].split("|"),
            desc: ele[2],birthTime: ele[3],
            mTime: ele[4],filename: ele[5],});
        });
        result.data.result.tags.forEach((tag) => {
          let files = tag.files.map((file) => {
            file = file.split("*=*");
            return {
              title: file[0],birthTime: file[1],filename: file[2],
            };
          });
          tmp.tags.push({tagName: tag.tagName,files,});
        });
        tmp.profile = result.data.result.profile;
        this.props.save_all(tmp);
      } else {
        alert("请求失败,请重试!");
      }
    });
    window.onscroll = () => {
      if (
        window.scrollY > window.innerHeight / 2 &&
        !this.props.windowScrollYFlag
      ) {
        this.props.change_window_scroll_flag();
      } else if (
        window.scrollY <= window.innerHeight / 2 &&
        this.props.windowScrollYFlag
      ) {
        this.props.change_window_scroll_flag();
      }
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div id="App">
          <Switch>
            <Route
              path={"/a/:path"}
              render={(props) => {
                return <Show {...props} />;
              }}
            />
            <Route
              path={"/about"}
              render={(props) => {
                return <About {...props} />;
              }}
            />
            <Route
              exact
              path={"/page/:page"}
              render={(props) => {
                return <Home {...props} />;
              }}
            />
            <Redirect to="/page/1" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const { windowScrollYFlag } = state;
  return { windowScrollYFlag };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    save_all: (data) => {
      dispatch(save_all_action(data));
    },
    change_window_scroll_flag: () => {
      dispatch(change_window_scroll_flag_action());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
