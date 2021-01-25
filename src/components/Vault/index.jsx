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
        const { purchaseLP, liquidVault } = this.props;
        const { inputEth } = this.state;
        purchaseLP(inputEth, liquidVault.balance);
    }

    stakeLp() {
        const { stake } = this.props;
        const { inputEth } = this.state;
        this.setState({ modalIsOpen: false })
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
        const { liquidVault } = this.props
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
                <div>{`Amount to send: ${parseFloat(inputEth - inputEth / 100 * liquidVault.purchaseFee).toFixed(4)}`}</div>
                <div>{`ETH fee: ${(inputEth / 100 * liquidVault.purchaseFee).toFixed(2)}`}</div>
            </div>
        )
    }

    render() {
        const { claim, liquidVault : {stakeDuration, notReadyTokens, tokens, availableHcore} } = this.props;
        const { modalIsOpen, modalType, inputEth } = this.state;
        return (
            <React.Fragment>
                <section className='vault'>
                    <div className='vault-page-title'>Vault (testnet)</div>
                    <div className='stake-panel'>
                        <div className='header-panel'>
                            <div className='header-text'>
                                Send ETH. It is pooled with $HCORE. Your discounted LP is locked for a period.
                            </div>
                            <div>
                                <div className='wrap-title second'>
                                    <div className='header-text'>Available $HCORE</div>
                                    <div className='stake-value'>{availableHcore}</div>
                                </div>
                            </div>
                        </div>
                        <div className='stake'>
                            <div className='stake-header'>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>Max ETH</div>
                                    <div className='stake-value'>00000000</div>
                                </div>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>Lock Period</div>
                                    <div className='stake-value'>{`${stakeDuration} Day`}</div>
                                </div>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>LP Discount</div>
                                    <div className='stake-value'>8.32%</div>
                                </div>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>LP Burn</div>
                                    <div className='stake-value'>10%</div>
                                </div>
                                <div className='second-block'>
                                    <div className='wrap-title second'>
                                        <div className='stake-title'>Not yet claimable LP</div>
                                        <div className='stake-value'>{notReadyTokens}</div>
                                    </div>
                                    <div className='wrap-title second'>
                                        <div className='stake-title'>Claimable LP</div>
                                        <div className='stake-value'>{tokens}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='stake-body'>
                                <div className='stake-input-wrap'>
                                    <input className='stake-input' type='text' placeholder='Amount' onChange={(e) => this.changeInput(e)} value={inputEth} />
                                    <div className='stake-type-eth' ></div>
                                </div>


                                <div className='stake-button btn unique' onClick={()=>{this.sendEth()}}>SEND ETH</div>
                                <a className='mobile' rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/send-eth-to-the-liquid-vault-claim-lp-tokens-53327b815e9b'>
                                        <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                    </a>
                                <div className='stake-button btn mr unique' onClick={claim}>CLAIM</div>
                                    <a className='mobile' rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/send-eth-to-the-liquid-vault-claim-lp-tokens-53327b815e9b'>
                                        <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                    </a>

                            </div>
                            <div className='stake-footer'>
                                <div className='stake-wrap-more'>
                                    <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/send-eth-to-the-liquid-vault-claim-lp-tokens-53327b815e9b'>
                                        <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                    </a>
                                    <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/send-eth-to-the-liquid-vault-claim-lp-tokens-53327b815e9b'>
                                        <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question-block'>
                        <div className='question'>Any questions? Please head over to our telegram group</div>
                        <a rel="noopener noreferrer" target="_blank" href='https://t.me/hcorefinance'>
                            <div className='button btn'>TELEGRAM</div>
                        </a>
                    </div>
                </section>
              
                {modalIsOpen ? (
                    <Modal confirmName='Send' name='vault' children={this.renderModalBody()} callback={modalType === 'send' ? this.sendEth : this.stakeLp} onClose={this.changeModalStatus} />
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
            dispatch(purchaseLP(value, balance));
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