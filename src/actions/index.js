import { getAuth } from './auth';
import { sendCoord, getBalance } from './LPGenesisPoolGame';
import { getEthAndHcoreBalance, sellHcore } from './NFTFund';
import { purchaseLP, claim, getLockedLP, stake, unStake } from './vault';

export {
    getAuth,
    sendCoord,
    purchaseLP,
    claim,
    getLockedLP,
    stake,
    getEthAndHcoreBalance,
    sellHcore,
    unStake,
    getBalance
}