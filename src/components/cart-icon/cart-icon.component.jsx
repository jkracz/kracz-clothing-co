import {CartIconContainer, ShoppingIcon, ItemCount} from "./cart-icon.styles.jsx";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartQuantity = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;