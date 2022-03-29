export const LOGIN_AUTH = "LOGIN_AUTH";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export function loginAuth(payload) {
  return {
    type: LOGIN_AUTH,
    payload,
  };
}
export function createUser(payload) {
  return {
    type: CREATE_USER,
    payload,
  };
}
export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload,
  };
}
