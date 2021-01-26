import NFTFundAbi from './abi/NFTFundAbi';
import HcoreAbi from './abi/Hcore';
import FeeDistAbi from './abi/FeeDistAbi'
import { getWeb3 } from "../utils";

export const getEthAndHcoreBalance = () => {
    return async dispatch => {
        const HCORE = '0xe6f6E7e3F5771d6B078474697a47f876a05b9426';
        const NFT_FUND_ADDRESS = '0x986766daed003748f7E9b896a837D2C17C74E40c';
        const FeeDistrAddress = '0x3BE435C19FE14082c043A003561551abf64e4530'
        const web3 = await getWeb3();
        const hCoreContract = await new web3.eth.Contract(HcoreAbi, HCORE);
        const feeDistContract = await new web3.eth.Contract(FeeDistAbi, FeeDistrAddress);

        let { burnPercentage, liquidVaultShare } = await feeDistContract.methods.recipients().call();
        let dev = 100 - burnPercentage - liquidVaultShare;

        let ethBalance = await web3.eth.getBalance(NFT_FUND_ADDRESS);
        let hCoreBalance = await hCoreContract.methods.balanceOf(NFT_FUND_ADDRESS).call();
        ethBalance = (+web3.utils.fromWei(ethBalance)).toFixed(5);
        hCoreBalance = web3.utils.fromWei(hCoreBalance);
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