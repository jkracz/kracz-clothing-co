import "./product-card.styles.scss";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import { useContext } from "react";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = (product) => {
        addItemToCart(product);
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={() => addProductToCart(product)} >ADD TO CART</Button>
        </div>
    )
}

export default ProductCard;