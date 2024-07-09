import { Link, Outlet } from "react-router-dom";
import { CartDropdown, CartIcon } from "../cart/Cart.tsx";
import {
  NavigationContainer,
  NavigationLink,
  NavigationLinkContainer,
  NavigationLogoContainer,
} from "./NavigationStyles.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector.ts";
import { selectIsOpen } from "../../store/cart/cartSelector.ts";
import { signOutStart } from "../../store/user/userAction.ts";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import React from "react";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isOpen = useSelector(selectIsOpen);
  const dispatch = useDispatch();

  return (
    <>
      <NavigationContainer>
        <Link className="navigation-link" to="/">
          <NavigationLogoContainer>
            <CrwnLogo className="logo" />
          </NavigationLogoContainer>
        </Link>
        <NavigationLinkContainer>
          <NavigationLink to="/shop">Shop</NavigationLink>
          {currentUser ? (
            <span onClick={() => dispatch(signOutStart())}>
              Sign Out
            </span>
          ) : (
            <NavigationLink to="/auth">sign-in</NavigationLink>
          )}
          <CartIcon />
        </NavigationLinkContainer>
        {isOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
