import { createSelector } from "reselect";

// a selector that returns the categories reducer
const selectCategoryReducer = (state) => state.categories;


// a selector that returns the categories array
// the selector caches the category reducer & the prev output of the func
// if the reducer stays the same, the cached prev value is returned; otherwise the func runs and recalcs the val
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);


// a selector that returns the category map
// the categories array from the output of selectCategories is cached
// the prev return val of the func is also cached
// if the array is different, then the func runs; otherwise the prev cached val is returned
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        const categoryMap = categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
        return categoryMap;
    }
)