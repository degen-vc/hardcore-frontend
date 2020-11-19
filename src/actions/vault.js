import { getWeb3 } from "../utils";
import liquidVaultAbi from './abi/LiquidVault';
import HcoreAbi from './abi/Hcore';
import LPGenesisPoolGame from './abi/LPGenesisPoolGameAbi';
import UniswapV2PairAbi from './abi/UniswapV2PairAbi';

export const purchaseLP = (value) => {
    return async dispatch => {
        const LIQUID_VAULT = '0x0e5DF687Da14396641DA79D707A92776B496d44e'
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
        const LIQUID_VAULT = '0x0e5DF687Da14396641DA79D707A92776B496d44e'
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
        const LIQUID_VAULT = '0x0e5DF687Da14396641DA79D707A92776B496d44e'
        const HCORE = '0xBd5c08AC48bb3a305Be99F0092a1f5C718B17D0b';
        const LPGenesisPoolGameAddress = '0x487A9312329e6FE697AfFe1623BC76Afdd1B2B6F';
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

                if (lockedLP[2] && (new Date().getTime() / 1000)) { // change && to <=
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

export const stake = () => {
    return async dispatch => {
        const LPGenesisPoolGameAddress = '0x487A9312329e6FE697AfFe1623BC76Afdd1B2B6F';
        const UniswapV2PairAddress = '0x0Cc8d503935c8be75EB8a85BcA5cfF2351D03F07'
        const web3 = await getWeb3();
        const ethAddress = await web3.eth.getAccounts();
        const LPGenesisPoolGameContract = await new web3.eth.Contract(LPGenesisPoolGame, LPGenesisPoolGameAddress);
        const UniswapV2Pair = await new web3.eth.Contract(UniswapV2PairAbi, UniswapV2PairAddress);
        await UniswapV2Pair.methods.approve(LPGenesisPoolGameAddress, 1).send({ from: ethAddress[0] })

        try {
            await LPGenesisPoolGameContract.methods.stake(1).send({ from: ethAddress[0] })
        } catch (error) {
            console.log(error)
        }
    }
}