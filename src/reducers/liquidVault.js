const initialState = {
    notReadyTokens: 0,
    tokens: 0,
    balance: 0,
    myPoints: 0,
    maxStake: 0,
    purchaseFee: 0,
    feeBalance: 0,
    stakeDuration: 0,
    myLpTokens: 0
}

export const liquidVault = function(state = initialState, action) {
    switch (action.type) {
        case "GET_LIQUID":
            const { notReadyTokens, tokens, balance, myPoints, maxStake, purchaseFee, feeBalance, stakeDuration, myLpTokens } = action.payload;
            return {...state,
                notReadyTokens,
                tokens,
                balance,
                myPoints,
                maxStake,
                purchaseFee,
                feeBalance,
                stakeDuration,
                myLpTokens
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