import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const { pathname } = new URL(request.url);
  const isLoggedIn = localStorage.getItem("loggedin");
  if (!isLoggedIn) {
    const response = redirect(
      `/login?message=You must log in first&redirectTo=${pathname}`
    );
    response.body = true;
    throw response;
  }
  return null;
}
