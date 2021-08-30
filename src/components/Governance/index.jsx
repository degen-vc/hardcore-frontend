import React, { PureComponent } from 'react';
import { getEthAndHcoreBalance, sellHcore } from '../../actions';
import { connect } from 'react-redux';
import './style.scss'

class NFT extends PureComponent {
    state = {
        popupOpen:false
    }
    componentDidMount() {
        const { getEthAndHcoreBalance } = this.props;
        getEthAndHcoreBalance()
    }

    render() {
        const { popupOpen } = this.state;
        const { liquidVault: { ethBalance, hCoreBalance, burnPercentage, liquidVaultShare, dev, fot }, sellHcore } = this.props;

        return (
            <main>
                <section className='Governance-page'>
                    <div className="governance-header">Governance</div>
                    <div className='block-wrap'>


                        <div className="block-1">
                            <div className="h-line"></div>
                            <div className='block-header'>$HCORE NFT Fund</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">Fund $HCORE balance</div>
                                    <div className="block-item-value">{hCoreBalance}</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">Fund MATIC balance</div>
                                    <div className="block-item-value">{ethBalance}</div>
                                </div>
                            </div>
                            <div className='block'>
                                {/* <div className='sell-button btn' onClick={sellHcore}>SELL $HCORE</div> */}
                                <div className='sell-button btn' onClick={()=>{this.setState({popupOpen:true})}}>SELL $HCORE</div>

                                <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/this-is-hardcore-dc3147eaafc'>
                                    <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                </a>

                            </div>
                        </div>
                        <div className="block-2">
                            <div className="h-line"></div>
                            <div className='block-header'>$HCORE Parameters</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">$HCORE burn</div>
                                    <div className="block-item-value">{`${burnPercentage}%`}</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">% FOT</div>
                                    <div className="block-item-value">{`${fot}%`}</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">% FOT to vault</div>
                                    <div className="block-item-value">{`${liquidVaultShare}%`}</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">% FOT to fund</div>
                                    <div className="block-item-value">{`${dev}%`}</div>
                                </div>
                            </div>
                            <div className='block-row'>
                                <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/governance-9c456098c699'>
                                    <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                </a>
                            </div>
                        </div>
                        <div className="block-2 mobile">
                            <div className="h-line"></div>
                            <div className='block-header'>$HCORE Parameters</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">$HCORE burn</div>
                                    <div className="block-item-value">{`${burnPercentage}%`}</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">% FOT</div>
                                    <div className="block-item-value">{`${fot}%`}</div>
                                </div>
                                
                            </div>
                            <div className='block-row'>
                            <div className='block-item'>
                                    <div className="block-item-header">% FOT to vault</div>
                                    <div className="block-item-value">{`${liquidVaultShare}%`}</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">% FOT to fund</div>
                                    <div className="block-item-value">{`${dev}%`}</div>
                                </div>
                            </div>
                                <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/governance-9c456098c699'>
                                    <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                </a>
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
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        liquidVault: state.liquidVault,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getEthAndHcoreBalance: (value) => {
            dispatch(getEthAndHcoreBalance(value));
        },
        sellHcore: () => {
            dispatch(sellHcore());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NFT);