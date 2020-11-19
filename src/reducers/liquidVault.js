const initialState = {
    notReadyTokens: 0,
    tokens: 0,
    balance: 0,
    myPoints: 0,
    maxStake: 0
}

export const liquidVault = function(state = initialState, action) {
    switch (action.type) {
        case "GET_LIQUID":
            const { notReadyTokens, tokens, balance, myPoints, maxStake } = action.payload;
            return Object.assign(...state, { notReadyTokens, tokens, balance, myPoints, maxStake });
        default:
            return state;
    }
};