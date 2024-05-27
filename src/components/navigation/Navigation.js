import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import { signoutUser } from "../../utils/firebase/Firebase";
import { cartContext } from "../../contexts/cartContext";
import { CartDropdown, CartIcon } from "../cart/Cart";
import {
  NavigationContainer,
  NavigationLink,
  NavigationLinkContainer,
  NavigationLogoContainer,
} from "./NavigationStyles";

const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { cartDropdown } = useContext(cartContext);

  const signOutHandler = async () => {
    await signoutUser();
  };
  return (
    <>
      <NavigationContainer>
        <Link className="navigation-link" to="/">
          <NavigationLogoContainer>logo</NavigationLogoContainer>
        </Link>
        <NavigationLinkContainer>
          <NavigationLink to="/shop">Shop</NavigationLink>
          {currentUser ? (
            <NavigationLink as="span" onClick={signOutHandler}>
              Sign Out
            </NavigationLink>
          ) : (
            <NavigationLink to="/auth">sign-in</NavigationLink>
          )}
          <CartIcon />
        </NavigationLinkContainer>
        {cartDropdown && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
