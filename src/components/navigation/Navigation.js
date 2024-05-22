import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
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
          <Link className="navigation-link" to="/sign-in">
            sign-in
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
