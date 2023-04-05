import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import {CategoryContainer, CategoryTitle} from "./category.styles.jsx";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)

    // you want to use state and effect bc you only want to update products if the category or the map changes
    // you don't want to update the page every time it loads 
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]);

    // if you have components dependent on an async variable (like categoriesMap)
    // then you'll want to have a safeguard to make sure the component is rendered only when there is data
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;