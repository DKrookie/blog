import { createStore } from "redux";

import reducer from "./reducer";

export default createStore(
  reducer,
  {
    pageSize: 10,
    currentPage: 1,
    menuClickFlag: false,
    windowScrollYFlag: false,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
