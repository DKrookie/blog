import React from "react";
import { connect } from "react-redux";

import "./Title.scss";

function Title(props) {
  const { title, bgImage } = props;
  if (!title) {
    return <div className="title"></div>;
  }
  return (
    <div className="title" style={{ backgroundImage: `url(${bgImage})` }}>
      <h1>{title.main}</h1>
      <p>{title.secondary}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { profile } = state;
  return { bgImage: profile && profile.bgImage };
};

export default connect(mapStateToProps)(Title);
