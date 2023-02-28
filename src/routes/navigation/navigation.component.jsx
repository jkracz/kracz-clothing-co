import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss"
// import logo from "../../assets/kracz-clothing-co.png"
// import { ReactComponent as CoLogo } from "../../assets/kracz-clothing-co.svg";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; 

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo" />
            </Link>
            {/* <Link className="logo-container" to="/">
                <CoLogo className="logo" />
            </Link> */}
            {/* <Link className="logo-container" to="/">
                <img className="logo" alt="clothing store logo" src={logo} />
            </Link> */}
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                    )
                }
                <CartIcon />
            </div>
            {
                // && operator checks the validity of the whole statement, and returns the last thing if all variables resolve to true
                isCartOpen && <CartDropdown />
            }
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation