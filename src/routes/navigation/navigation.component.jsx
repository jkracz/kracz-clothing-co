import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss"
// import logo from "../../assets/kracz-clothing-co.png"
// import { ReactComponent as CoLogo } from "../../assets/kracz-clothing-co.svg";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; 
import { UserContext } from "../../contexts/user.context";


const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

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
                        <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                    )
                }
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation