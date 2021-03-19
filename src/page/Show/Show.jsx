import React, { Component } from "react";

import Axios from "axios";
import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import Template from "../Template/Template";

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

export default class Show extends Component {
  state = {
    md: "",
    info: [],
  };
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

  render() {
    let { info } = this.state,
      tags = [];
    if (info.length) {
      tags = info[4].split(" ");
    }
    return (
      <Template
        tags={this.props.tags}
        title={
          <>
            <h1>{info[3]}</h1>
            {tags.map((ele) => (
              <span key={ele}>#{ele}</span>
            ))}
          </>
        }
        component={
          <>
            <main className="post-page">
              <article
                className="article-entry"
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.md).replace(
                    /<pre>/g,
                    "<pre class=hljs>"
                  ),
                }}
              />
              <div className="license-wrapper">
                <p>
                  原文作者：<a href="http://dkzmy.com">dk</a>
                </p>
                <p>
                  原文链接：
                  <a
                    href={"https://dkzmy.com/a/" + this.props.match.params.path}
                  >
                    {"https://dkzmy.com/a/" + this.props.match.params.path}
                  </a>
                </p>
                <p>
                  发表日期：
                  <a
                    href={"https://dkzmy.com/a/" + this.props.match.params.path}
                  >
                    {this.state.info[1]}
                  </a>
                </p>
                <p>
                  更新日期：
                  <a
                    href={"https://dkzmy.com/a/" + this.props.match.params.path}
                  >
                    {this.state.info[2]}
                  </a>
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
          </>
        }
      />
    );
  }
}
