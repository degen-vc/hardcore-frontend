import React, { PureComponent } from 'react';
import { getEthAndHcoreBalance, sellHcore } from '../../actions';
import { connect } from 'react-redux';
import './style.scss'

class NFT extends PureComponent {
    constructor() {
        super()
    }

    componentDidMount() {
        const { getEthAndHcoreBalance } = this.props;
        getEthAndHcoreBalance()
    }

    render() {

        return (
            <main>
                <section className='About-page'>
                    <div className='about-page-header'>Tokenomics</div>
                    <div className='tokenomics-panel'>
                        <div className="block-1">
                            <div className='block-header'>DISTRIBUTION</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">ALPHADROP</div>
                                    <div className="block-item-value">85%</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">DEGEN.VC</div>
                                    <div className="block-item-value">15%</div>
                                </div>
                            </div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">Vault</div>
                                    <div className="block-item-value">15%</div>
                                </div>
                            </div>
                        </div>

                        <div className="block-2">
                            <div className='block-header'>$HCORE TOKEN</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">Token Name</div>
                                    <div className="block-item-value">HCORE.FINANCE</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">Total Supply</div>
                                    <div className="block-item-value">30,000 (capped)</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">Burnable</div>
                                    <div className="block-item-value">Yes</div>
                                </div>
                            </div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">Token Symbol</div>
                                    <div className="block-item-value">HCORE</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">Mintable</div>
                                    <div className="block-item-value">No</div>
                                </div>
                                <div className='block-item xl'>
                                    <div className="block-item-header">Token address</div>
                                    <div className="block-item-value">
                                        <span>0x0b9D...2e14</span>
                                        <span className='copy'>Copy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block-3">
                            <div className='block-header'>FEE ALLOCATION</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">Vault</div>
                                    <div className="block-item-value">2%</div>
                                </div>
                            </div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">NFT Fund</div>
                                    <div className="block-item-value">3%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='about-section'>

                        <div className='header-about-section'>About HARDCORE</div>
                        <div className="about-section-description">
                            <div>
                                Breaking new ground, HARDCORE features a vault smart contract that receives 2% of the 5% Fee on Transfer (FOT) revenue and to which anyone can send ETH in
                                order to receive UNI-V2 LP tokens (i.e. nearly 50% discounted), which are automatically locked for one month.
                           </div>
                            <div>
                                What sets HARDCORE apart even more is that LP stakers can earn points with UNI-V2 LP that can be used to mine NFTs to win exotic cars.
                                These rewards are acquired by the NFT fund smart contract using the other 3% of the fee revenue.
                           </div>
                            <div>
                                The Degen.VC approach is to #alphadrop (airdrop) tokens to the DGVC LP and let the Uniswap market do the rest.
                                This innovation has been covered in notable publications such as: The Coin Tribune; Altcoin Buzz, and Irish Tech News.
                           </div>
                        </div>
                        <div className="button-about"></div>
                    </div>
                    <div className="exotic-section">
                        <div className='clock-wrapper'>
                            <div className='exotic-header'>Exotic Prizes</div>
                            <div className='exotic-description'>HARDCORE spot the ball games will run consecutively.
                            Players will need to unstake and stake again each time. Consider it like buying a ticket.
                        Sometimes we will mix things up, for example, by offering a Rolex watch as the prize instead of a sports car.</div>
                        </div>
                    </div>
                    <div className='team-section'>

                        <div className='team-section-header'>Our Team</div>

                        <div className='photos'>
                            <div>
                                <div className='photo fraser'></div>
                                <div className='name'>Fraser Brown</div>
                                <div className='description-photo'>Co-founder • Degen.VC</div>
                                <div className='social'><a rel="noopener noreferrer" target="_blank" href='https://www.linkedin.com/in/fraserbrown-org/'>
                                    <div className='icon twitter'></div>
                                </a>
                                    <a rel="noopener noreferrer" target="_blank" href='https://www.linkedin.com/in/fraserbrown-org/'>
                                        <b>In</b>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className='photo paul'></div>
                                <div className='name'>Paul Scott</div>
                                <div className='description-photo'>Co-founder • Degen.VC</div>
                                <div className='social'><a rel="noopener noreferrer" target="_blank" href='https://twitter.com/paulscott005'>
                                    <div className='icon twitter'></div>
                                </a>
                                    <a rel="noopener noreferrer" target="_blank" href='https://www.linkedin.com/in/paulscott55/'>
                                        <b>In</b>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className='photo justin'></div>
                                <div className='name'>Justin Goro</div>
                                <div className='description-photo'>Senior Dev • Degen.VC</div>
                                <div className='social'><a rel="noopener noreferrer" target="_blank" href='https://github.com/gititGoro'>
                                    <div className='icon github'></div>
                                </a>
                                </div>
                            </div>
                            <div>
                                <div className='photo richard'></div>
                                <div className='name'>Richard Parker</div>
                                <div className='description-photo'>Community • Degen.VC</div>
                                <div className='social'>
                                    <a rel="noopener noreferrer" target="_blank" href='https://twitter.com/upspwnage'>
                                        <div className='icon twitter'></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question-block'>
                        <div className='question'>Any questions? Please head over to our telegram group</div>
                        <a rel="noopener noreferrer" target="_blank" href='https://t.me/hcorefinance'>
                            <div className='button'></div>
                        </a>
                    </div>
                </section>
            </main>
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
        getEthAndHcoreBalance: (value) => {
            dispatch(getEthAndHcoreBalance(value));
        },
        sellHcore: () => {
            dispatch(sellHcore());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NFT);