const initialState = {
    authorization: false
  }
  
  export const auth = function (state = initialState, action) {
    switch (action.type) {
      case "AUTHORIZATION":
        return Object.assign(...state, {authorization: action.payload});
      default:
        return state;
    }
  };