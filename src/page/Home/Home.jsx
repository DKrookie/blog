import React from "react";

import Tmpelate from "../Template/Template";
import Articles from "../../component/Articles/Articles";
import Page from "../../component/GenPage/GenPage";
import Profile from "../../component/Profile/Profile";

export default function Home(props) {
  return (
    <Tmpelate
      tags={props.tags}
      title={
        <>
          <h1>dk's Blog</h1>
          <p>一个快毕业的前端攻城狮/archlinux新手</p>
        </>
      }
      component={
        <>
          <main className="articles">
            <Articles articles={props.articles} />
            <Page
              total={props.articles.length}
              pageSize={20}
              currentPage={props.match.params.page}
            />
          </main>
          <Profile />
        </>
      }
    />
  );
}
