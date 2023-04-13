import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// this is a thunk
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments("categories");
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// }

// cannot have async await in a gen
export function* fetchCategoriesAsync() {
    try {
        // call is to make a func an effect
        const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
        // put is like calling dispatch
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

// generators respond to actions like how reducers do
// this gen func is responding to fetchcategoriesstart
export function* onFetchCategories() {
    // get latest action
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    // all is an effect that says "run everything inside and only complete when it's done"
    // all takes an array of different functions
    yield all([call(onFetchCategories)]);
}