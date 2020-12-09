import { combineReducers } from 'redux';
import { auth } from './auth';
import { liquidVault } from './liquidVault';
import { getBalance } from './lpGame';

const rootReducer = combineReducers({
    auth,
    liquidVault,
    getBalance
});

export default rootReducer;