export function login(state = { message: false }, action) {
  console.log("in reducer", action);
  switch (action.type) {
    case "success":
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
