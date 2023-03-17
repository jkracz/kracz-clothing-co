import {DirectoryItemContainer, BackgroundImage, Body} from "./directory-item.styles.jsx"

const DirectoryItem = ({ category }) => {
  return (
    <DirectoryItemContainer key={category.id}>
      <BackgroundImage imageUrl={category.imageUrl} />
      <Body>
        <h2>{category.title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem