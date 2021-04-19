import actionType from "./actionType";

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SAVE_ALL:
      return {
        ...state,
        ...action.data,
      };
    case actionType.SAVE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: Number(action.currentPage),
      };
    case actionType.CHANGE_MENU_CLICK_FLAG:
      return {
        ...state,
        menuClickFlag: !state.menuClickFlag,
      };
    case actionType.CHANGE_WINDOW_SCROLL_FLAG:
      return {
        ...state,
        windowScrollYFlag: !state.windowScrollYFlag,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
