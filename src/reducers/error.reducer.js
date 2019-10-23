export function globalError(state = { message: false }, action) {
  switch (action.type) {
    case "global":
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
