import { combineReducers } from 'redux';

import useReducer from '~/redux/reducers/useReducer';

const rootReducer = combineReducers({
    user: useReducer,
});

export default rootReducer;
