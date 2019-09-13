import {
  SET_CURRENT_USER,
  SET_LOADING,
  CLEAR_CURRENT_USER,
  SET_ALERT,
  CLEAR_LOADING,
} from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
        alert: 'Successfully Logged Out',
      };
    default:
      return state;
  }
};
