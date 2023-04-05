export const selectCategoriesMap = (state) => {
    const categoryMap = state.categories.categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};