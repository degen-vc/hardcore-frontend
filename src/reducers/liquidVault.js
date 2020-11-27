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
            return {...state,
                notReadyTokens,
                tokens,
                balance,
                myPoints,
                maxStake
            };
        case "GET_ETH_AND_HCORE_BALANCE":
            const { ethBalance, hCoreBalance } = action.payload;
            return {...state,
                ethBalance,
                hCoreBalance
            };
        default:
            return state;
    }
};