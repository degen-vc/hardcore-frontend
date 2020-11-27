import NFTFundAbi from './abi/NFTFundAbi';
import HcoreAbi from './abi/Hcore';
import { getWeb3 } from "../utils";

export const getEthAndHcoreBalance = () => {
    return async dispatch => {
        const HCORE = '0x49bc86b40237527ec19874aCA15bCb095B363f2E';
        const NFT_FUND_ADDRESS = '0x6EAca23FF914C75d43fB8e2519E5Bc486bb48947';
        const web3 = await getWeb3();
        const hCoreContract = await new web3.eth.Contract(HcoreAbi, HCORE);
        let ethBalance = await web3.eth.getBalance(NFT_FUND_ADDRESS);
        let hCoreBalance = await hCoreContract.methods.balanceOf(NFT_FUND_ADDRESS).call();
        ethBalance = web3.utils.fromWei(ethBalance)
        hCoreBalance = web3.utils.fromWei(hCoreBalance)

        await dispatch({ type: "GET_ETH_AND_HCORE_BALANCE", payload: { ethBalance, hCoreBalance } });
    }
}
export const sellHcore = () => {
    return async dispatch => {
        const NFT_FUND_ADDRESS = '0x6EAca23FF914C75d43fB8e2519E5Bc486bb48947';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const NFTFundContract = await new web3.eth.Contract(NFTFundAbi, NFT_FUND_ADDRESS);
        NFTFundContract.methods.swapTokensForETH().send({ from: ethAddress[0] })
    }
}