const initialState = {"isLoggedIn": false,"firstName": "","email": "", "fullName":""};

export default function userReducer(state = initialState, action) {
  if (action.type === "USER_LOAD") {
    return action.payload;
  } else {
    return state;
  }
}
