import React, { PureComponent } from 'react';
import { purchaseLP, claim, getLockedLP, stake, unStake } from '../../actions';
import Modal from '../../shared/Modal'
import { connect } from 'react-redux';
import './style.scss'

class Vault extends PureComponent {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            inputEth: '',
            modalType: ''
        }

        this.changeModalStatus = this.changeModalStatus.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.sendEth = this.sendEth.bind(this)
        this.stakeLp = this.stakeLp.bind(this)
    }

    componentDidMount() {
        const { getLockedLP } = this.props;
        getLockedLP()
    }

    sendEth() {
        const { purchaseLP , liquidVault} = this.props;
        const { inputEth } = this.state;
        this.setState({modalIsOpen: false})
        purchaseLP(inputEth,  liquidVault.balance);
    }

    stakeLp() {
        const { stake } = this.props;
        const { inputEth } = this.state;
        this.setState({modalIsOpen: false})
        stake(inputEth);
    }

    changeInput(e) {
        this.setState({ inputEth: e.target.value });
    }

    changeModalStatus(type) {
        let { modalIsOpen } = this.state;
        this.setState({ modalIsOpen: !modalIsOpen, inputEth: '', modalType: type })
    }

    renderModalBody() {
        const { inputEth, modalType } = this.state;
        const {liquidVault} = this.props
        if (modalType !== 'send') {
            return (
                <div className='wrap-modal'>
                    <div className='title'>Enter Value</div>
                    <input type='number' value={inputEth} onChange={this.changeInput}></input>
                    <div>{`LP balance: ${liquidVault.myLpTokens}`}</div>
                </div>
            )
        }
        return (
            <div className='wrap-modal'>
                <div className='title'>Enter Value</div>
                <input type='number' value={inputEth} onChange={this.changeInput}></input>
                <div>{`Amount to send: ${inputEth - inputEth / 100  * liquidVault.purchaseFee}`}</div>
                <div>{`ETH fee: ${inputEth / 100  * liquidVault.purchaseFee}`}</div>
            </div>
        )
    }

    render() {
        const { claim, liquidVault, unStake} = this.props;
        const { modalIsOpen, modalType } = this.state;
        return (
            <React.Fragment>
                <main>
                    <section className='vault'>
                        <div className='description'>
                            <h1>VAULT</h1>
                            <h3>{`$HCORE TRANSFER FEES RECEIVED AND AVAILABLE NOW: ${liquidVault.feeBalance}`}</h3>
                            <div className='description-item'>{`Sent ETH and receive $HCORE/ETH-UNI-V2-LP tokens claimable after ${liquidVault.stakeDuration} days`}</div>
                            <br />
                            <div className='description-item'>{`Current percentage of ETH: ${liquidVault.purchaseFee}%`}</div>
                        </div>
                        <div className='vault-button-wrap'>
                             <div className='button-vault'>
                                <h2>STAKE LP</h2>
                                <div className='white-line'></div>
                                <div className='hc-value'>{`YOUR POINTS: ${parseFloat(liquidVault.myPoints).toFixed(2)}`}</div>
                                <div className='discriptrion-value'>{`MAX STAKE: ${liquidVault.maxStake}`}</div>
                                <div className='button' onClick={() => this.changeModalStatus('stake')}>Stake</div>
                                <div className='unstake' onClick={unStake}>Unstake</div>
                            </div>
                            <div className='button-vault'>
                                <h2>SEND ETH</h2>
                                <div className='white-line'></div>
                                <div className='hc-value'>{`AVAILABLE $HCORE: ${liquidVault.balance}`}</div>
                                <div className='button' onClick={() => this.changeModalStatus('send')}>Send ETH</div>
                            </div>
                            <div className='button-vault'>
                                <h2>CLAIM LP</h2>
                                <div className='white-line'></div>
                                <div className='hc-value'>{`CLAIMABLE: ${liquidVault.tokens}`}</div>
                                <div className='discriptrion-value'>{`NOT YET CLAIMABLE: ${liquidVault.notReadyTokens}`}</div>
                                <div className='button' onClick={claim}>Claim LP</div>
                            </div>
                        </div>
                    </section>
                </main>
                {modalIsOpen ? (
                    <Modal confirmName='Send' name='vault' children={this.renderModalBody()} callback={modalType === 'send' ?  this.sendEth : this.stakeLp} onClose={this.changeModalStatus} />
                ) : null}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        liquidVault: state.liquidVault
    };
};

const mapDispatchToProps = dispatch => {
    return {
        purchaseLP: (value, balance) => {
            dispatch(purchaseLP(value,balance ));
        },
        claim: () => {
            dispatch(claim());
        },
        getLockedLP: () => {
            dispatch(getLockedLP());
        },
        stake: (value) => {
            dispatch(stake(value))
        },
        unStake: () => {
            dispatch(unStake())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vault);