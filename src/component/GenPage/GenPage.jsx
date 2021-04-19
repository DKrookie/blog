import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./GenPage.scss";
import { save_current_page_action } from "../../store/action";

function GenPage(props) {
  if (!props.total) {
    return <></>;
  }
  let sumPage = Math.ceil(props.total / props.pageSize) || 1;
  if (props.match.params.page < 1 || props.match.params.page > sumPage) {
    props.history.push("/page/1");
    return <></>;
  }
  let currentPage = Number(props.match.params.page) || 1;
  currentPage = currentPage > sumPage ? sumPage : currentPage;
  props.save_current_page(props.match.params.page);
  function go(url) {
    if (props.location.pathname !== url) {
      props.history.push(url);
    }
    window.scrollTo(0, 0);
  }
  return (
    <nav className="page-nav">
      <div>{currentPage}</div>
      <span
        className="prev btn"
        onClick={() => {
          go(`/page/${currentPage - 1 < 1 ? 1 : currentPage - 1}`);
        }}
      >
        上一页
      </span>
      <span
        className="next btn"
        onClick={() => {
          go(`/page/${currentPage + 1 > sumPage ? sumPage : currentPage + 1}`);
        }}
      >
        下一页
      </span>
    </nav>
  );
}

const mapStateToProps = (state) => {
  const { pageSize, articles } = state;
  return {
    pageSize,
    total: articles ? articles.length : 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save_current_page: (currentPage) => {
      dispatch(save_current_page_action(currentPage));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GenPage));
