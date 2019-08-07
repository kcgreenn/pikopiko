import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      console.log(action);
      return action.payload.data;
    default:
      return state;
  }
}
