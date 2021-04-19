import React from "react";
import { connect } from "react-redux";
import md5 from "blueimp-md5";

import "./Profile.scss";

function Profile(props) {
  const { profile } = props;
  if (!profile) {
    return <div className="profile"></div>;
  }
  function openNewWindow(url) {
    window.open(url);
  }
  function openEmail(url) {
    window.location.href = url;
  }
  function concatList(social) {
    let list = [];
    for (let key in social) {
      if (key === "email" && social[key]) {
        list.push(
          <i
            className="iconfont icon-email email"
            key={key}
            onClick={() => {
              openEmail(`mailto:${social[key]}`);
            }}
          />
        );
      } else if (social[key]) {
        list.push(
          <i
            className={`iconfont icon-${key} ${key}`}
            key={key}
            onClick={() => {
              openNewWindow(social[key]);
            }}
          />
        );
      }
    }
    return list;
  }

  return (
    <div className="profile">
      <img
        src={`https://www.gravatar.com/avatar/${md5(
          profile.social.email
        )}?s=640`}
        alt="gravatar"
        title="gravatar"
      />
      <div className="profile-name">{profile.name}</div>
      <div className="profile-signature">{profile.signature}</div>
      <div className="profile-concat">{concatList(profile.social)}</div>
      <div className="frends">
        <div>Friends</div>
        <div>
          {profile.friends.map((friend) => {
            return (
              <span key={friend.name}>
                <a href={friend.link} target="_blank" rel="noreferrer">
                  {friend.name}
                </a>
              </span>
            );
          })}
        </div>
      </div>
      {profile.about.enable ? (
        <div className="about-me">
          <a href="/about">ABOUT ME</a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { profile } = state;
  return { profile };
};

export default connect(mapStateToProps)(Profile);
