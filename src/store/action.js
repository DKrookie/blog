import actionType from "./actionType";

export const save_all_action = (data) => {
  return {
    type: actionType.SAVE_ALL,
    data,
  };
};

export const save_current_page_action = (currentPage) => {
  return {
    type: actionType.SAVE_CURRENT_PAGE,
    currentPage,
  };
};

export const change_menu_click_flag_action = () => {
  return {
    type: actionType.CHANGE_MENU_CLICK_FLAG,
  };
};

export const change_window_scroll_flag_action = () => {
  return {
    type: actionType.CHANGE_WINDOW_SCROLL_FLAG,
  };
};
