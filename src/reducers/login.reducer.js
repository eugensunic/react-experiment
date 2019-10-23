export function login(state = { status: false }, action) {
  switch (action.type) {
    case "success":
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}
