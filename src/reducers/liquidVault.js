const initialState = {
    notReadyTokens: 0,
    tokens: 0,
    balance: 0,
    myPoints: 0,
    maxStake: 0,
    purchaseFee: 0,
    feeBalance: 0,
    stakeDuration: 0,
    myLpTokens: 0,
    HcoreLP: 0,
    burnPercentage: 0,
    dev: 0,
    liquidVaultShare: 0,
    availableHcore: 0
}

export const liquidVault = function(state = initialState, action) {
    switch (action.type) {
        case "GET_LIQUID":
            const { notReadyTokens, tokens, balance, myPoints, maxStake, purchaseFee, feeBalance, stakeDuration, myLpTokens, myBalanceHcore, HcoreLP, myHcoreLp, availableHcore, fot } = action.payload;
            return {...state,
                notReadyTokens,
                tokens,
                balance,
                myPoints,
                maxStake,
                purchaseFee,
                feeBalance,
                stakeDuration,
                myLpTokens,
                HcoreLP,
                myHcoreLp,
                availableHcore,
                myBalanceHcore,
                fot
            };
        case "GET_ETH_AND_HCORE_BALANCE":
            const { ethBalance, hCoreBalance, burnPercentage, dev, liquidVaultShare } = action.payload;
            return {...state,
                ethBalance,
                hCoreBalance,
                burnPercentage,
                dev,
                liquidVaultShare
            };
        default:
            return state;
    }
};