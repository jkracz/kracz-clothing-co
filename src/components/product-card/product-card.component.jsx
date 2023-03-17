import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles.jsx";

import { CartContext } from "../../contexts/cart.context";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component.jsx";
import { useContext } from "react";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = (product) => {
        addItemToCart(product);
    }

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => addProductToCart(product)} >ADD TO CART</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;