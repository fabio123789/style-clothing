import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.scss";
import { userContext } from "../../contexts/userContext";
import { signoutUser } from "../../utils/firebase/Firebase";

const Navigation = () => {
  const { currentUser } = useContext(userContext);

  const signOutHandler = async () => {
    await signoutUser();
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="navigation-link" to="/">
          <div className="navigation-logo-container">logo</div>
        </Link>
        <div className="navigation-link-container">
          <Link className="navigation-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="navigation-link" onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link className="navigation-link" to="/auth">
              sign-in
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
