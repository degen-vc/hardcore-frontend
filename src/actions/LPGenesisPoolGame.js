import { getWeb3 } from "../utils";
import LPGenesisPoolGameAbi from './abi/LPGenesisPoolGameAbi'

export const sendCoord = (x, y) => {
    return async dispatch => {
        const GAME_MINTER = '0xe12624301b8d1CdCD1d639F586F73A4Ebc4314B6';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const GameContract = await new web3.eth.Contract(LPGenesisPoolGameAbi, GAME_MINTER);
        await GameContract.methods.redeem(x, y).send({ from: ethAddress[0] })
    }
}