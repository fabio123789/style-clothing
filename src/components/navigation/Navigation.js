import { Link, Outlet } from "react-router-dom";
import { signoutUser } from "../../utils/firebase/Firebase";
import { CartDropdown, CartIcon } from "../cart/Cart";
import {
  NavigationContainer,
  NavigationLink,
  NavigationLinkContainer,
  NavigationLogoContainer,
} from "./NavigationStyles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectIsOpen } from "../../store/cart/cartSelector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isOpen = useSelector(selectIsOpen);

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
        {isOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
