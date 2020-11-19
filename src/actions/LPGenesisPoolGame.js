import { SPOT_GAME } from '../constants';
import { getWeb3 } from "../utils";
import LPGenesisPoolGameAbi from './abi/LPGenesisPoolGameAbi'

export const sendCoord = (x, y) => {
    return async dispatch => {
        const GAME_MINTER = process.env.REACT_APP_POOL_MINTER;
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const GameContract = await new web3.eth.Contract(LPGenesisPoolGameAbi, GAME_MINTER);
        await GameContract.methods.redeem(x, y).send({ from: ethAddress[0] })
    }
}