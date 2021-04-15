import authReducer from "./authReducer";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";

const configureStore = (addLogger = true) => {
    const middleware = addLogger
        ? applyMiddleware(thunk, logger)
        : applyMiddleware(thunk);
    return createStore(authReducer, middleware);
}

export default configureStore;