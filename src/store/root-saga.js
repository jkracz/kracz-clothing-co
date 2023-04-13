// point of this file is to encapsulate all of the different sagas
// similar to using reducers with redux

import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/category.saga";

// function is a generator func def
export function* rootSaga() {
    yield all([call(categoriesSaga)])
}