import { getWeb3 } from "../utils";
import LPGenesisPoolGameAbi from './abi/LPGenesisPoolGameAbi'

export const sendCoord = (x, y) => {
    return async dispatch => {
        const GAME_MINTER = '0xF60c095B4Aaf0F30297c937983B948BBD2261EDe';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const GameContract = await new web3.eth.Contract(LPGenesisPoolGameAbi, GAME_MINTER);
        await GameContract.methods.redeem(x, y).send({ from: ethAddress[0] })
    }
}