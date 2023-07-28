import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { NavigationContainer, NavLink, LogoContainer, NavLinks } from "./navigation.styles.jsx";
import { ReactComponent as CrwnLogo } from "../../assets/KCC.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
    // hook you pass a selector func; a func that extracts the values you want from the redux store
    // selector updates whenever the state obj changes
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();

    const signOutUser = async () => {
        dispatch(signOutStart());
    };

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as="span" className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}
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
};

export default Navigation;
