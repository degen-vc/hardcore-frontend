import NFTFundAbi from './abi/NFTFundAbi';
import HcoreAbi from './abi/Hcore';
import { getWeb3 } from "../utils";

export const getEthAndHcoreBalance = () => {
    return async dispatch => {
        const HCORE = '0x49bc86b40237527ec19874aCA15bCb095B363f2E';
        const NFT_FUND_ADDRESS = '0x986766daed003748f7E9b896a837D2C17C74E40c';
        const web3 = await getWeb3();
        const hCoreContract = await new web3.eth.Contract(HcoreAbi, HCORE);
        let ethBalance = await web3.eth.getBalance(NFT_FUND_ADDRESS);
        let hCoreBalance = await hCoreContract.methods.balanceOf(NFT_FUND_ADDRESS).call();
        ethBalance = web3.utils.fromWei(ethBalance);
        hCoreBalance = web3.utils.fromWei(hCoreBalance);
        await dispatch({ type: "GET_ETH_AND_HCORE_BALANCE", payload: { ethBalance, hCoreBalance } });
    }
}
export const sellHcore = () => {
    return async dispatch => {
        const NFT_FUND_ADDRESS = '0x986766daed003748f7E9b896a837D2C17C74E40c';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const NFTFundContract = await new web3.eth.Contract(NFTFundAbi, NFT_FUND_ADDRESS);
        NFTFundContract.methods.swapTokensForETH().send({ from: ethAddress[0] })
    }
}