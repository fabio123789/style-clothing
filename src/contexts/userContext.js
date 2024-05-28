import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/Firebase";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const userActionType = {
  setCurrentUser: "setCurrentUser",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActionType.setCurrentUser:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in user Reducer`);
  }
};

const initialState = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, initialState);

  const setCurrentUser = (user) => {
    dispatch({ type: userActionType.setCurrentUser, payload: user });
  };

  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
