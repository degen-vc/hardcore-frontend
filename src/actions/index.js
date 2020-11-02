import {AUTHORIZATION} from '../constants';
// this function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';


import { getWeb3 } from "../utils";

export const getAuth = () => {
  return async dispatch => {

    const web3 = await getWeb3();
    const ethAddress = await web3.eth.getAccounts();

    dispatch( { type: AUTHORIZATION, payload: ethAddress[0] });
  }
}

export const initMetamask = async () => {
  const provider = await detectEthereumProvider();
  console.log('asdjhaskjdlasjhdljaslh')
  if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    // startApp(provider); // initialize your app
    console.log('here')
  } else {
    console.log('Please install MetaMask!');
  }
}