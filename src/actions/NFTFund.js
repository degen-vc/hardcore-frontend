import NFTFundAbi from './abi/NFTFundAbi';
import HcoreAbi from './abi/Hcore';
import FeeDistAbi from './abi/FeeDistAbi'
import { getWeb3 } from "../utils";

const HCOREAddress = process.env.REACT_APP_HCORE_ADDRESS
const NFT_FUND_ADDRESS = process.env.REACT_APP_NFT_FUND_ADDRESS
const FEE_DIST_ADDRESS = process.env.REACT_APP_FEE_DIST_ADDRESS

export const getEthAndHcoreBalance = () => {
    return async dispatch => {
        const web3 = await getWeb3();
        const hCoreContract = await new web3.eth.Contract(HcoreAbi, HCOREAddress);
        const feeDistContract = await new web3.eth.Contract(FeeDistAbi, FEE_DIST_ADDRESS);

        let dev = 0;
        let { burnPercentage, liquidVaultShare } = await feeDistContract.methods.recipients().call();
        dev = 100 - burnPercentage - liquidVaultShare;
        console.log(2222, burnPercentage)
        let ethBalance = await web3.eth.getBalance(NFT_FUND_ADDRESS);
        let hCoreBalance = await hCoreContract.methods.balanceOf(NFT_FUND_ADDRESS).call();
        ethBalance = (+web3.utils.fromWei(ethBalance)).toFixed(5);
        hCoreBalance = (+web3.utils.fromWei(hCoreBalance)).toFixed(5);
        await dispatch({ type: "GET_ETH_AND_HCORE_BALANCE", payload: { ethBalance, hCoreBalance, burnPercentage, dev, liquidVaultShare } });
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