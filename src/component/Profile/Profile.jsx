import React from "react";

export default function Profile(props) {
  return (
    <div className="profile">
      <img
        src="https://www.gravatar.com/avatar/71dce28a35c8feca4f2ada6a632391f0?s=640"
        alt="gravatar"
        title="dk"
      />
      <div className="profile-name">dk</div>
      <div className="profile-signature">
        带着对技术的敬畏之心成长，不安于一隅...
      </div>
      <div className="profile-concat">
        <a
          className="iconfont icon-email"
          href="mailto:lorexxar@gmail.com"
          target="_blank"
          rel="noreferrer"
        >{""}</a>
        <a
          className="iconfont icon-github"
          href="https://github.com/DKrookie"
          target="_blank"
          rel="noreferrer"
        >{""}</a>
      </div>
      <div className="frends">
        <div>友链</div>
        <div>
          <span>
            <a href="/" target="_blank">
              wiki
            </a>
          </span>
        </div>
      </div>
      <div className="about-me">
        <a href="/">ABOUT ME</a>
      </div>
    </div>
  );
}
