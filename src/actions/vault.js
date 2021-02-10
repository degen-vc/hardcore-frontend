import { getWeb3 } from "../utils";
import liquidVaultAbi from './abi/LiquidVault';
import HcoreAbi from './abi/Hcore';
import FeeApproverAbi from './abi/FeeApproverAbi';
import LPGenesisPoolGame from './abi/LPGenesisPoolGameAbi';
import UniswapV2PairAbi from './abi/UniswapV2PairAbi';
import FeeDistAbi from './abi/FeeDistAbi'

const LIQUID_VAULT = process.env.REACT_APP_LIQUID_VAULT;
const HCORE = process.env.REACT_APP_HCORE_ADDRESS;
const LPGenesisPoolGameAddress = process.env.REACT_APP_LP_POOL_ADDRESS;
const FEE_DISTRIBUTOR = process.env.REACT_APP_FEE_DIST_ADDRESS;
const UniswapV2PairAddress = process.env.REACT_APP_UNISWAP_PAIR_ADDRESS;
const FeeApprover = process.env.REACT_APP_FEE_APPROVER;

export const purchaseLP = (value, balance) => {

    return async dispatch => {
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);
        try {
            const { hardCoreRequired } = await LiquidContract.methods.calculateHardcoreRequired(web3.utils.toWei(value + '')).call()

            if (+balance >= +web3.utils.fromWei(hardCoreRequired)) {
                await LiquidContract.methods.purchaseLP().send({ from: ethAddress[0], value: web3.utils.toWei(`${value}`) });
            } else {
                alert('Insufficient HardCore in LiquidVault')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const claim = () => {
    return async dispatch => {
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


        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        const UniswapV2Pair = await new web3.eth.Contract(UniswapV2PairAbi, UniswapV2PairAddress);
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);
        const HcoreContract = await new web3.eth.Contract(HcoreAbi, HCORE);
        const feeDistContract = await new web3.eth.Contract(FeeDistAbi, FEE_DISTRIBUTOR);
        const FeeApproverContract = await new web3.eth.Contract(FeeApproverAbi, FeeApprover);

        try {
            let tokens = 0;
            let notReadyTokens = 0;
            let balance = 0;
            let feeBalance = 0;
            let myHcoreLp = 0;
            let availableHcore = 0;
            let myBalanceHcore = 0;
            let fot = 0;


            let { purchaseFee, stakeDuration } = await LiquidContract.methods.config().call();

            const length = await LiquidContract.methods.lockedLPLength(ethAddress[0]).call();
            if (length === '0') {

            } else {
                let data = await LiquidContract.methods.getLockedLP(ethAddress[0], length - 1).call();
                tokens = data[1];
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
                    notReadyTokens = web3.utils.toBN(notReadyTokens).add(web3.utils.toBN(lockedLP[1]))
                }
                notReadyTokens = notReadyTokens !== 0 ? +web3.utils.fromWei(notReadyTokens + '') : 0;
                notReadyTokens = parseFloat(notReadyTokens.toFixed(2));
            }
            fot = await FeeApproverContract.methods.feePercentX100().call();
            balance = await HcoreContract.methods.balanceOf(LIQUID_VAULT).call();
            feeBalance = await HcoreContract.methods.balanceOf(FEE_DISTRIBUTOR).call();
            myHcoreLp = await UniswapV2Pair.methods.balanceOf(ethAddress[0]).call()
            let { liquidVaultShare } = await feeDistContract.methods.recipients().call();
            let feeDistBalanceOnePercentage = (await HcoreContract.methods.balanceOf(FEE_DISTRIBUTOR).call() / 100).toFixed(0);
            feeDistBalanceOnePercentage = web3.utils.toBN(feeDistBalanceOnePercentage)
            liquidVaultShare = web3.utils.toBN(liquidVaultShare)
            availableHcore = web3.utils.toBN(await HcoreContract.methods.balanceOf(LIQUID_VAULT).call()).add(feeDistBalanceOnePercentage.mul(liquidVaultShare))
            availableHcore = +web3.utils.fromWei(availableHcore)
            availableHcore = availableHcore.toFixed(3)
            let myPoints = await LPGenesisPoolGameContract.methods.earned(ethAddress[0]).call()
            let myLpTokens = await UniswapV2Pair.methods.balanceOf(ethAddress[0]).call()
            let HcoreLP = await LPGenesisPoolGameContract.methods.balanceOf(ethAddress[0]).call()
            HcoreLP = +web3.utils.fromWei(HcoreLP + '');
            myHcoreLp = +web3.utils.fromWei(myHcoreLp + '');
            myHcoreLp = myHcoreLp.toFixed(5)
            feeBalance = +web3.utils.fromWei(feeBalance + '')
            feeBalance = feeBalance.toFixed(2)

            balance = +web3.utils.fromWei(balance + '')
            balance = balance.toFixed(2);
            myPoints = +web3.utils.fromWei(myPoints + '')
            myLpTokens = +web3.utils.fromWei(myLpTokens + '');
            myLpTokens = myLpTokens.toFixed(2);
            let maxStake = 2.02;
            stakeDuration = stakeDuration / 60 / 60 / 24

            myBalanceHcore = await HcoreContract.methods.balanceOf(ethAddress[0]).call();
            myBalanceHcore = +myBalanceHcore


            await dispatch({ type: "GET_LIQUID", payload: { myBalanceHcore, availableHcore, myHcoreLp, myLpTokens, stakeDuration, feeBalance, purchaseFee, notReadyTokens, tokens, balance, myPoints, maxStake, HcoreLP, fot } });

        } catch (error) {
            console.log(error)
        }
    }
}

export const stake = (value) => {
    return async dispatch => {
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        let balance = await LPGenesisPoolGameContract.methods.balanceOf(ethAddress[0]).call();
        value = web3.utils.toWei(value);
        balance = web3.utils.toBN(balance);
        let expected = web3.utils.toWei('2.02');
        expected = web3.utils.toBN(expected);
        if (web3.utils.toBN(value).add(balance).gt(expected)) {
            alert("You can't stake more than 2.02");
            return
        }

        const UniswapV2Pair = await new web3.eth.Contract(UniswapV2PairAbi, UniswapV2PairAddress);
        await UniswapV2Pair.methods.approve(LPGenesisPoolGameAddress, value).send({ from: ethAddress[0] })
        try {
            await LPGenesisPoolGameContract.methods.stake(value).send({ from: ethAddress[0] })
        } catch (error) {
            console.log(error)
        }
    }
}

export const unStake = () => {
    return async dispatch => {
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

export const unStakePrevious = () => {
    return async dispatch => {
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