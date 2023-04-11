import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, NavLink, LogoContainer, NavLinks } from "./navigation.styles.jsx"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";


const Navigation = () => {
    // hook you pass a selector func; a func that extracts the values you want from the redux store
    // selector updates whenever the state obj changes
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as="span" className="nav-link" onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to="/auth">SIGN IN</NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {
                    // && operator checks the validity of the whole statement, and returns the last thing if all variables resolve to true
                    isCartOpen && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation