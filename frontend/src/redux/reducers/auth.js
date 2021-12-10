import { USER_STATE_CHANGE } from "../constants";

const initialState = {
  //something
  currentUser: null,
  loaded: false,
};

export const auth = (state = initialState, action) => {
  ///something
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        //somehting else
        ...state,
        currentUser: action.currentUser,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};
