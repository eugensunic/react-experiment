export * from "./history";
export * from "./store";
export * from "./mock-call";

export const isLoggedIn = (): boolean => !!localStorage.getItem("user");
