import {CheckoutItemContainer, ImageContainer, Image, Attributes, Quantity, Value, Arrow, RemoveButton} from "./checkout-item.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={name} />
            </ImageContainer>
            <Attributes>{name}</Attributes>
            <Quantity>
                <Arrow onClick={() => { removeItemFromCart(cartItem) }}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={() => { addItemToCart(cartItem) }}>&#10095;</Arrow>
            </Quantity>
            <Attributes>{price}</Attributes>
            <RemoveButton onClick={() => clearItemFromCart(cartItem)} >&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;