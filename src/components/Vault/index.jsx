import React, { PureComponent } from 'react';
import { purchaseLP, claim, getLockedLP, stake, unStake ,getEthAndHcoreBalance} from '../../actions';
import Modal from '../../shared/Modal'
import { connect } from 'react-redux';
import './style.scss'

class Vault extends PureComponent {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            inputEth: '',
            modalType: '',
            globalTime: 0,
            popupOpen: false
        }

        this.changeModalStatus = this.changeModalStatus.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.sendEth = this.sendEth.bind(this)
        this.stakeLp = this.stakeLp.bind(this)
    }



    componentDidMount() {
        const { getLockedLP } = this.props;
        const { getEthAndHcoreBalance } = this.props;
        getEthAndHcoreBalance()
    getLockedLP()
    this.setState({ globalTime: 1613390400 - (new Date().getTime() / 1000) })
    this.interval = setInterval(() => {
        let { globalTime } = this.state;
        globalTime--;
        this.setState({ globalTime })
    }, 1000);
       
    }
    componentWillMount() {
        clearInterval(this.interval)
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

    getExpiredTime(time) {
        let { globalTime } = this.state;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        if (time / 86400 >= 1) {
            days = (time / 86400);
            days = Math.trunc(days)
        }
        if (days) {
            time -= days * 86400;
        }
        if (time / 3600 >= 1) {
            hours = time / 3600;
            hours = Math.trunc(hours)
        }
        if (hours) {
            time -= hours * 3600;
        }
        if (time / 60 >= 1) {
            minutes = time / 60;
            minutes = Math.trunc(minutes)
        }
        if (minutes) {
            time -= minutes * 60;
        }
        seconds = Math.round(time);
        if ((!days && !hours && !minutes && !seconds) || globalTime <= 0) {
            return [0, 0, 0, 0]
        }

        return [days, hours, minutes, seconds]

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
        const { claim, liquidVault: { stakeDuration, notReadyTokens, tokens, availableHcore,maxEth,burnPercentage } } = this.props;
        const { modalIsOpen, globalTime, modalType, inputEth, popupOpen } = this.state;
        const [days, hours, minutes, seconds] = this.getExpiredTime(globalTime);
        return (
            <React.Fragment>
                <section className='vault'>
                    <div className='vault-page-title'>Vault</div>
                    <div className='vault-notification'>Vault will be capitalised with HCORE in: {`${days}D ${hours === 0 ? '00' : hours < 10 ? '0' + hours : hours}:${minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</div>
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
                                    <div className='stake-value'>{maxEth}</div>
                                </div>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>Lock Period</div>
                                    <div className='stake-value'>{`${stakeDuration} Day`}</div>
                                </div>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>LP Discount</div>
                                    <div className='stake-value'>30%</div>
                                </div>
                                <div className='wrap-title first'>
                                    <div className='stake-title'>LP Burn</div>
                                    <div className='stake-value'>5%</div>
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


                                <div className='stake-button btn unique' onClick={() => { this.sendEth() }}>SEND ETH</div>
                                {/* <div className='stake-button btn unique' onClick={()=>{this.setState({popupOpen: true})}}>SEND ETH</div> */}
                                <a className='mobile' rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/send-eth-to-the-liquid-vault-claim-lp-tokens-53327b815e9b'>
                                    <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                </a>
                                {/* <div className='stake-button btn mr unique' onClick={claim}>CLAIM</div> */}
                                <div className='stake-button btn mr unique' onClick={()=>{this.setState({popupOpen: true})}}>CLAIM</div>
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
                {popupOpen ? (
                    <div className='pop-up'>
                        <div className='pop-up-body'>
                            <div className='text-pop-up'>
                            Will be live soon
                        </div>
                            <div className='pop-up-button' onClick={() => { this.setState({ popupOpen: false }) }}>OK</div>
                        </div>
                    </div>
                ) : null}
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
        getEthAndHcoreBalance: () => {
            dispatch(getEthAndHcoreBalance());
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