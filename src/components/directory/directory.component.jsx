import { Categories } from "./directory.styles.jsx"
import DirectoryItem from "../directory-item/directory-item.component"

const Directory = ({categories}) => {
    return (
        <Categories>
            {categories.map((category) => {
                return (
                    <DirectoryItem key={category.id} category={category} /> 
                )
            })}
        </Categories>
    )
}

export default Directory