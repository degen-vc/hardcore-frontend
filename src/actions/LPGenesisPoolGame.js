import { getWeb3 } from "../utils";
import LPGenesisPoolGameAbi from './abi/LPGenesisPoolGameAbi'

export const sendCoord = (x, y) => {
    return async dispatch => {
        const LPGenesisPoolGameAddress = '0xe35223Eb1DE581E7C80597EC248ABcd8b5f00eb0';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGameAbi, LPGenesisPoolGameAddress);
        let need = await LPGenesisPoolGameContract.methods.rewardNeeded().call();
        let balance = await LPGenesisPoolGameContract.methods.earned(ethAddress[0]).call();
        if (web3.utils.toBN(balance).gte(need)) {
            await LPGenesisPoolGameContract.methods.redeem(x, y).send({ from: ethAddress[0] })
        } else {
            alert("You don't have enough points")
        }
    }
}

export const getBalance = () => {
    return async dispatch => {
        const LPGenesisPoolGameAddress = '0xe35223Eb1DE581E7C80597EC248ABcd8b5f00eb0';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGameAbi, LPGenesisPoolGameAddress);
        let need = await LPGenesisPoolGameContract.methods.rewardNeeded().call();
        let balance = await LPGenesisPoolGameContract.methods.earned(ethAddress[0]).call();
        balance = web3.utils.fromWei(balance + '')
        need = web3.utils.fromWei(need + '')
        await dispatch({ type: "GET_BALANCE", payload: { need, balance } });
    }
}