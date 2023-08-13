import { createContext, useContext, useReducer } from "react";

const LogInContext = createContext();

const initialState = {
  status: localStorage.getItem("loggedin") ? "loggedIn" : "loggedOut",
};

function reducer(state, action) {
  switch (action.type) {
    case "logIn":
      return { ...state, status: "loggedIn" };

    case "logOut":
      //   const response = redirect("/host");
      //   response.body = true;
      localStorage.removeItem("loggedin");
      return { ...state, status: "loggedOut" };

    default:
      throw new Error("Action unknown");
  }
}

// if (isLoggedIn) {
//   const response = redirect("/host");
//   response.body = true;
//   return response;
// }

function LoginProvider({ children }) {
  const [{ status }, dispatch] = useReducer(reducer, initialState);

  return (
    <LogInContext.Provider value={{ dispatch, status }}>
      {children}
    </LogInContext.Provider>
  );
}

function useLog() {
  const context = useContext(LogInContext);
  return context;
}

export { LoginProvider, useLog };
