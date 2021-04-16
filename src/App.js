import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Axios from "axios";

import Home from "./page/Home/Home";
import Show from "./page/Show/Show";

import "./App.scss";

export default class App extends Component {
  state = {
    articles: [],
    tags: [],
  };
  componentDidMount() {
    Axios.get("/api/all").then((result) => {
      if (result.data.status) {
        this.setState({
          articles: result.data.result.allFiles,
          tags: result.data.result.tags,
        });
      } else {
        alert("请求失败,请重试!");
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div id="App">
          <Switch>
            <Route
              path={"/a/:path"}
              render={(props) => {
                return (
                  <Show
                    tags={this.state.tags}
                    {...props}
                  />
                );
              }}
            />
            <Route
              exact
              path={"/page/:page"}
              render={(props) => {
                return (
                  <Home
                    articles={this.state.articles}
                    tags={this.state.tags}
                    {...props}
                  />
                );
              }}
            />
            <Redirect to="/page/1" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
