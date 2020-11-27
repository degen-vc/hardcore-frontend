import React, { PureComponent } from 'react';
import { purchaseLP, claim, getLockedLP, stake } from '../../actions';
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
    }

    componentDidMount() {
        const { getLockedLP } = this.props;
        getLockedLP()
    }

    sendEth() {
        const { purchaseLP } = this.props;
        const { inputEth } = this.state;
        purchaseLP(inputEth);
    }

    changeInput(e) {
        this.setState({ inputEth: e.target.value });
    }

    changeModalStatus(type) {
        let { modalIsOpen } = this.state;
        this.setState({ modalIsOpen: !modalIsOpen, inputEth: '', modalType: type })
    }

    renderModalBody() {
        const { inputEth } = this.state;
        return (
            <div className='wrap-modal'>
                <div className='title'>Enter Value</div>
                <input type='text' value={inputEth} onChange={this.changeInput}></input>
            </div>
        )
    }

    render() {
        const { claim, liquidVault} = this.props;
        const { modalIsOpen,modalType } = this.state;
        return (
            <React.Fragment>
                <main>
                    <section className='vault'>
                        <div className='description'>
                            <h1>VAULT</h1>
                            <h3>$HCORE TRANSFER FEES RECEIVED AND AVAILABLE NOW: 000</h3>
                            <div className='description-item'>Sent ETH and receive $HCORE/ETH-UNI-V2-LP tokens claimable after 30 days</div>
                            <br />
                            <div className='description-item'>Current percentege of EHT fee</div>
                        </div>
                        <div className='vault-button-wrap'>
                            <div className='button-vault'>
                                <h2>STAKE LP</h2>
                                <div className='white-line'></div>
                                <div className='hc-value'>{`YOUR POINTS: ${liquidVault.myPoints}`}</div>
                                <div className='discriptrion-value'>{`MAX STAKE: ${liquidVault.maxStake}`}</div>
                                <div className='button' onClick={() => this.changeModalStatus('stake')}>Stake</div>
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
                                <div className='hc-value'>{`CLAIMABLE: ${liquidVault.notReadyTokens}`}</div>
                                <div className='discriptrion-value'>{`NOT YET CLAIMABLE: ${liquidVault.tokens}`}</div>
                                <div className='button' onClick={claim}>Claim LP</div>
                            </div>
                        </div>
                    </section>
                </main>
                {modalIsOpen ? (
                    <Modal name='vault' children={this.renderModalBody()} callback={modalType === 'send' ? this.sendEth : stake} onClose={this.changeModalStatus} />
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
        purchaseLP: (value) => {
            dispatch(purchaseLP(value));
        },
        claim: () => {
            dispatch(claim());
        },
        getLockedLP: () => {
            dispatch(getLockedLP());
        },
        stake: () => {
            dispatch(stake())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vault);