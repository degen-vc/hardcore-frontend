import { getWeb3 } from "../utils";
import LPGenesisPoolGameAbi from "./abi/LPGenesisPoolGameAbi";
const LPGenesisPoolGameAddress = process.env.REACT_APP_LP_POOL_ADDRESS;

export const sendCoord = (x, y) => {
  return async (dispatch) => {
    const web3 = await getWeb3();
    const ethAddress = await web3.eth.getAccounts();
    const LPGenesisPoolGameContract = await new web3.eth.Contract(
      LPGenesisPoolGameAbi,
      LPGenesisPoolGameAddress
    );
    let need = await LPGenesisPoolGameContract.methods.rewardNeeded().call();
    let balance = await LPGenesisPoolGameContract.methods
      .earned(ethAddress[0])
      .call();
    if (web3.utils.toBN(balance).gte(need)) {
      await LPGenesisPoolGameContract.methods
        .redeem(x, y)
        .send({ from: ethAddress[0] });
      let need = await LPGenesisPoolGameContract.methods.rewardNeeded().call();
      let balance = await LPGenesisPoolGameContract.methods
        .earned(ethAddress[0])
        .call();
      balance = web3.utils.fromWei(balance + "");
      need = web3.utils.fromWei(need + "");
      await dispatch({ type: "GET_BALANCE", payload: { need, balance } });
    } else {
      alert("You don't have enough points");
    }
  };
};

export const getBalance = () => {
  return async (dispatch) => {
    console.log("kasjdlkasjdlaskdaslkj");
    const web3 = await getWeb3();
    const ethAddress = await web3.eth.getAccounts();
    const LPGenesisPoolGameContract = await new web3.eth.Contract(
      LPGenesisPoolGameAbi,
      LPGenesisPoolGameAddress
    );
    let need = await LPGenesisPoolGameContract.methods.rewardNeeded().call();
    let balance = await LPGenesisPoolGameContract.methods
      .earned(ethAddress[0])
      .call();
    balance = web3.utils.fromWei(balance + "");
    need = web3.utils.fromWei(need + "");
    await dispatch({ type: "GET_BALANCE", payload: { need, balance } });
  };
};
