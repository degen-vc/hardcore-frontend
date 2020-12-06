import { getWeb3 } from "../utils";
import liquidVaultAbi from './abi/LiquidVault';
import HcoreAbi from './abi/Hcore';
import LPGenesisPoolGame from './abi/LPGenesisPoolGameAbi';
import UniswapV2PairAbi from './abi/UniswapV2PairAbi';

export const purchaseLP = (value, balance) => {
    return async dispatch => {
        const LIQUID_VAULT = '0xC7d5E6f15F963A7479176dD29ccd8E52e2526ea3'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);
        try {
            const { hardCoreRequired } = await LiquidContract.methods.calculateHardcoreRequired(web3.utils.toWei(value + '')).call()

            if (+balance >= +web3.utils.fromWei(hardCoreRequired)) {
                await LiquidContract.methods.purchaseLP().send({ from: ethAddress[0], value: web3.utils.toWei(`${value}`) });
            } else {
                // send alert
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const claim = () => {
    return async dispatch => {
        const LIQUID_VAULT = '0xC7d5E6f15F963A7479176dD29ccd8E52e2526ea3'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);


        try {
            await LiquidContract.methods.claimLP().send({ from: ethAddress[0] })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getLockedLP = () => {
    return async dispatch => {

        const LIQUID_VAULT = '0xC7d5E6f15F963A7479176dD29ccd8E52e2526ea3'
        const HCORE = '0xe6f6E7e3F5771d6B078474697a47f876a05b9426';
        const LPGenesisPoolGameAddress = '0xe35223Eb1DE581E7C80597EC248ABcd8b5f00eb0';
        const FEE_DISTRIBUTOR = '0x3BE435C19FE14082c043A003561551abf64e4530'
        const UniswapV2PairAddress = '0x740E9F161f4DF6D9027b35cB2AEc4A0137B5a36b'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        const UniswapV2Pair = await new web3.eth.Contract(UniswapV2PairAbi, UniswapV2PairAddress);
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);
        const HcoreContract = await new web3.eth.Contract(HcoreAbi, HCORE);

        try {
            let tokens = 0;
            let notReadyTokens = 0;
            let balance = 0;
            let feeBalance = 0;

            let { purchaseFee, stakeDuration } = await LiquidContract.methods.config().call();

            const length = await LiquidContract.methods.lockedLPLength(ethAddress[0]).call();
            if (length === '0') {

            } else {
                let data = await LiquidContract.methods.getLockedLP(ethAddress[0], length - 1).call();
                tokens = data[1]
                let count = 0;

                if (stakeDuration < (new Date().getTime() / 1000) - data[2]) {
                    count++;
                } else {
                    tokens = 0
                }
                tokens = +web3.utils.fromWei(tokens + '')
                tokens = parseFloat(tokens).toFixed(2);
                for (let i = 0; i < length - count; i++) {
                    const lockedLP = await LiquidContract.methods.getLockedLP(ethAddress[0], i).call();
                    if (stakeDuration > (new Date().getTime() / 1000) - lockedLP[2]) {
                        notReadyTokens = web3.utils.toBN(notReadyTokens).add(web3.utils.toBN(lockedLP[1]))
                    }
                }
                notReadyTokens = notReadyTokens !== 0 ? +web3.utils.fromWei(notReadyTokens + '') : 0;
                notReadyTokens = parseFloat(notReadyTokens.toFixed(2));
            }
            balance = await HcoreContract.methods.balanceOf(LIQUID_VAULT).call();
            feeBalance = await HcoreContract.methods.balanceOf(FEE_DISTRIBUTOR).call();

            let myPoints = await LPGenesisPoolGameContract.methods.earned(ethAddress[0]).call()
            let myLpTokens = await UniswapV2Pair.methods.balanceOf(ethAddress[0]).call()

            feeBalance = +web3.utils.fromWei(feeBalance + '')
            feeBalance = feeBalance.toFixed(2)

            balance = +web3.utils.fromWei(balance + '')
            balance = balance.toFixed(2);
            myPoints = +web3.utils.fromWei(myPoints + '')
            myLpTokens = +web3.utils.fromWei(myLpTokens + '');
            myLpTokens = myLpTokens.toFixed(2);
            let maxStake = 2.02;
            stakeDuration = stakeDuration / 60 / 60 / 24

            await dispatch({ type: "GET_LIQUID", payload: { myLpTokens, stakeDuration, feeBalance, purchaseFee, notReadyTokens, tokens, balance, myPoints, maxStake } });

        } catch (error) {
            console.log(error)
        }
    }
}

export const stake = (value) => {
    return async dispatch => {
        const LPGenesisPoolGameAddress = '0xe35223Eb1DE581E7C80597EC248ABcd8b5f00eb0';
        const UniswapV2PairAddress = '0x740E9F161f4DF6D9027b35cB2AEc4A0137B5a36b'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        const UniswapV2Pair = await new web3.eth.Contract(UniswapV2PairAbi, UniswapV2PairAddress);
        await UniswapV2Pair.methods.approve(LPGenesisPoolGameAddress, web3.utils.toWei(value)).send({ from: ethAddress[0] })
        try {
            await LPGenesisPoolGameContract.methods.stake(web3.utils.toWei(value)).send({ from: ethAddress[0] })
        } catch (error) {
            console.log(error)
        }
    }
}

export const unStake = () => {
    return async dispatch => {
        const LPGenesisPoolGameAddress = '0xe35223Eb1DE581E7C80597EC248ABcd8b5f00eb0';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);

        try {
            await LPGenesisPoolGameContract.methods.exit().send({ from: ethAddress[0] })
        } catch (error) {
            console.log(error)
        }
    }
}