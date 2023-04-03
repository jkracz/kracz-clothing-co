import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// library run before action hits the reducers
const middleWares = [logger];

// for middlewares to work, you need to apply them
// compose is a functional programming concept
// there are different kinds of enhancers we can write; middleware is just one kind
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);