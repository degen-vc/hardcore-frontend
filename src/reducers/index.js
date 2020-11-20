import { combineReducers } from 'redux';
import { auth } from './auth';
import { liquidVault } from './liquidVault'

const rootReducer = combineReducers({
    auth,
    liquidVault
});

export default rootReducer;