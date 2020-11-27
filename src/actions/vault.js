import { getWeb3 } from "../utils";
import liquidVaultAbi from './abi/LiquidVault';
import HcoreAbi from './abi/Hcore';
import LPGenesisPoolGame from './abi/LPGenesisPoolGameAbi';
import UniswapV2PairAbi from './abi/UniswapV2PairAbi';

export const purchaseLP = (value) => {
    return async dispatch => {
        const LIQUID_VAULT = '0x2706eb7ff1bb7424aF23A5aAEfab0A83aaC62165'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);
        try {
            await LiquidContract.methods.purchaseLP().send({ from: ethAddress[0], value: web3.utils.toWei(`${value}`) })
        } catch (error) {
            console.log(error)
        }
    }
}

export const claim = () => {
    return async dispatch => {
        const LIQUID_VAULT = '0x2706eb7ff1bb7424aF23A5aAEfab0A83aaC62165'
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
        const LIQUID_VAULT = '0x2706eb7ff1bb7424aF23A5aAEfab0A83aaC62165'
        const HCORE = '0x49bc86b40237527ec19874aCA15bCb095B363f2E';
        const LPGenesisPoolGameAddress = '0xef64Ec53b7723823d35D5BD69D47beB6102f59fe';
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        const LiquidContract = await new web3.eth.Contract(liquidVaultAbi, LIQUID_VAULT);
        const HcoreContract = await new web3.eth.Contract(HcoreAbi, HCORE);

        try {
            const length = await LiquidContract.methods.lockedLPLength('0x77a3701f8f68565170Dc801656c426882E2ED8aD').call();

            let tokens = 0;
            let notReadyTokens = 0;
            let balance = 0;
            for (let i = 0; i < length; i++) {
                const lockedLP = await LiquidContract.methods.getLockedLP('0x77a3701f8f68565170Dc801656c426882E2ED8aD', i).call();
                balance = await HcoreContract.methods.balanceOf(LIQUID_VAULT).call();

                if (lockedLP[2] <= (new Date().getTime() / 1000)) { // change && to <=
                    tokens += lockedLP[1];
                } else {
                    notReadyTokens += lockedLP[1]
                }
            }
            const myPoints = await LPGenesisPoolGameContract.methods.earned(ethAddress[0]).call()

            notReadyTokens = +web3.utils.fromWei(tokens)
            notReadyTokens = notReadyTokens.toFixed(2);

            tokens = +web3.utils.fromWei(tokens)
            tokens = tokens.toFixed(2);

            balance = +web3.utils.fromWei(balance)
            balance = balance.toFixed(2);

            let maxStake = 2.02;

            await dispatch({ type: "GET_LIQUID", payload: { notReadyTokens, tokens, balance, myPoints, maxStake } });

        } catch (error) {
            console.log(error)
        }
    }
}

export const stake = (value) => {
    return async dispatch => {
        const LPGenesisPoolGameAddress = '0xef64Ec53b7723823d35D5BD69D47beB6102f59fe';
        const UniswapV2PairAddress = '0xF28Ae277407E13c4da0d02886e1b97114c57Cb97'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        const UniswapV2Pair = await new web3.eth.Contract(UniswapV2PairAbi, UniswapV2PairAddress);
        await UniswapV2Pair.methods.approve(LPGenesisPoolGameAddress, value).send({ from: ethAddress[0] })

        try {
            await LPGenesisPoolGameContract.methods.stake(value).send({ from: ethAddress[0] })
        } catch (error) {
            console.log(error)
        }
    }
}