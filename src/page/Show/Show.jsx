import React, { Component } from "react";
import Axios from "axios";
import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { connect } from "react-redux";

import "./Show.scss";

import Header from "../../component/Header/Header";
import Title from "../../component/Title/Title";
import Sidebar from "../../component/Sidebar/Sidebar";
import ToTop from "../../component/ToTop/ToTop";
import { change_menu_click_flag_action } from "../../store/action";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      md: "",
      info: [],
    };
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    Axios({
      method: "POST",
      url: "/api/md",
      data: {
        filename: this.props.match.params.path,
      },
    }).then((results) => {
      this.setState({
        md: results.data.result.str,
        info: results.data.result.info,
      });
    });
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
    let { info } = this.state,
      tags = [];
    if (info.length) {
      tags = info[1].split("|");
      tags = tags.map((tag) => "#" + tag);
    }
    return (
      <div id="Show">
        <Header menuClickHandle={this.menuClickHandle} />
        <div
          className={`wrapper ${
            this.props.menuClickFlag ? "wrapper-active" : ""
          }`}
          ref={this.wrapper}
        >
          <Title
            title={{
              main: info[0],
              secondary: tags,
            }}
          />
          <div className="container">
            <main className="post-page">
              <article
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.md).replace(
                    /<pre>/g,
                    "<pre class=hljs>"
                  ),
                }}
              />
              <div className="license-wrapper">
                <p>
                  原文作者：<span>dk</span>
                </p>
                <p>
                  原文链接：
                  <span>{"https://dkzmy.com/a/" + this.state.info[4]}</span>
                </p>
                <p>
                  发表日期：
                  <span>{this.state.info[2]}</span>
                </p>
                <p>
                  更新日期：
                  <span>{this.state.info[3]}</span>
                </p>
                <p>
                  版权声明：本文采用
                  <a
                    rel="license noopener noreferrer"
                    href="http://creativecommons.org/licenses/by-nc/4.0/"
                    target="_blank"
                  >
                    知识共享署名-非商业性使用 4.0 国际许可协议
                  </a>
                  进行许可
                </p>
              </div>
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
  const { menuClickFlag, windowScrollYFlag } = state;
  return {
    menuClickFlag,
    windowScrollYFlag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change_menu_click_flag: () => {
      dispatch(change_menu_click_flag_action());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
