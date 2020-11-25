import { getWeb3 } from "../utils";
import LPGenesisPoolGameAbi from './abi/LPGenesisPoolGameAbi'

export const sendCoord = (x, y) => {
    return async dispatch => {
        const GAME_MINTER = '0xef64Ec53b7723823d35D5BD69D47beB6102f59fe';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const GameContract = await new web3.eth.Contract(LPGenesisPoolGameAbi, GAME_MINTER);
        await GameContract.methods.redeem(x, y).send({ from: ethAddress[0] })
    }
}