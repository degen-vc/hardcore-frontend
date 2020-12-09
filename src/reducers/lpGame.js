const initialState = {
    need: 0,
    balance: 0
}

export const getBalance = function(state = initialState, action) {
    switch (action.type) {
        case "GET_BALANCE":
            const { need, balance } = action.payload;
            return {...state,
                need,
                balance
            };
        default:
            return state;
    }
};