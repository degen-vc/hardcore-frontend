import React, { PureComponent } from 'react';
import Game from '../SpotTheBall';
import { connect } from 'react-redux';
import { purchaseLP, claim, getLockedLP, stake, unStake } from '../../actions'
import './style.scss';

class Home extends PureComponent {
    constructor() {
        super()
        this.state = {
            globalTime: 0,
            inputEth: '',
        }
    }

    componentDidMount() {
        this.setState({ globalTime: 500000 })
        this.interval = setInterval(() => {
            let { globalTime } = this.state;
            globalTime--;
            this.setState({ globalTime })
        }, 1000);
        this.props.getLockedLP()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getExpiredTime(time) {
        let { globalTime } = this.state;
        let days, hours, minutes, seconds;
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
    stakeLp() {
        const { stake } = this.props;
        const { inputEth } = this.state;
        stake(inputEth);
        this.setState({ inputEth: '' })
    }
    changeInput(e) {
        this.setState({ inputEth: e.target.value });
    }

    render() {
        const { globalTime, inputEth } = this.state;
        const [days, hours, minutes, seconds] = this.getExpiredTime(globalTime);
        const { liquidVault: { maxStake, myPoints, balance }, unStake } = this.props;
        console.log(this.props)
        return (
            <main className='home-page'>
                <section>
                    <div className='space'></div>
                    <div className='background-image'>
                        <div className='title'>Stake tokens to Win a Lambo</div>

                        <div className='btn connect-button'>CONNECT WALLET</div>
                        <div className="play-button"></div>
                    </div>

                    <div className='content-wrap'>
                        <div className='title-launch'>Launch</div>
                        <div className='timer'>
                            {`${days}D ${hours}:${minutes}:${seconds}`}
                        </div>
                        <div className='wrap-items'>
                            <div className='item'>
                                <div className='number'>1</div>
                                <div className='title'>Swap DGVC on Uniswap</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/swap'>
                                    <div className='button swap'>SWAP</div>
                                </a>
                            </div>
                            <div className='item'>
                                <div className='number'>2</div>
                                <div className='title'>Pool DGVC on Uniswap</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/add/ETH'>
                                    <div className='button pool'>POOL</div>
                                </a>
                            </div>
                            <div className='item'>
                                <div className='number'>3</div>
                                <div className='title'>Wait for the #Alphadrop</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://www.degen.vc'>
                                    <div className='button degen'>DEGEN.VC</div>
                                </a>

                            </div>
                        </div>


                    </div>

                    <div className='stake-block'>
                        <div className='title'>Stake to earn points</div>
                        <div className='stake-panel'>
                            <div className='stake'>
                                <div className='stake-header'>
                                    <div className='wrap-title first'>
                                        <div className='stake-title'>Your $HCORE LP</div>
                                        <div className='stake-value'>{balance}</div>
                                    </div>
                                    <div className='wrap-title second'>
                                        <div className='stake-title'>Point rate</div>
                                        <div className='stake-value'>2 Points / day</div>
                                    </div>
                                    <div className='wrap-title third'>
                                        <div className='stake-title'>Max stake</div>
                                        <div className='stake-value'>{maxStake}</div>
                                    </div>
                                    <div className='wrap-title fourth'>
                                        <div className='stake-title'>Staked $HCORE LP</div>
                                        <div className='stake-value'>{parseFloat(myPoints).toFixed(4)}</div>
                                    </div>
                                </div>
                                <div className='stake-body'>
                                    <div className='stake-input-wrap'>
                                        <input className='stake-input' type='text' placeholder='Amount' onChange={(e) => this.changeInput(e)} value={inputEth} />
                                        <div className='stake-type'>LP</div>
                                    </div>
                                    <div className='stake-button' onClick={this.stakeLp}>STAKE</div>
                                    <div className='unstake-button' onClick={unStake}>UNSTAKE</div>
                                </div>
                                <div className='stake-footer'>
                                    <div className='stake-wrap-more'>
                                        <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/hcore-supply-rewards-1eedf2aad99c'>
                                            <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                        </a>
                                        <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore/hcore-supply-rewards-1eedf2aad99c'>
                                            <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='stake-link'>Unstake from previous games <div>&#8250;</div></div>
                    </div>
                    <div className='game'>
                        <div className='game-header'>
                            Play Spot the Ball
                        </div>
                        <Game />
                    </div>
                    <div className='news-hardcore'>
                        <div className='news-title'>New to HARDCORE?</div>
                        <div className='wrap-items'>
                            <div className='item'>
                                <div className='label-item arrows'></div>
                                <div className='title'>Swap $HCORE on Uniswap</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/swap'>
                                    <div className='button swap'>SWAP</div>
                                </a>
                            </div>
                            <div className='item'>
                                <div className='label-item money'></div>
                                <div className='title'>Pool $HCORE on Uniswap</div>

                                <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/add/ETH'>
                                    <div className='button pool'>POOL</div>
                                </a>
                            </div>
                            <div className='item'>
                                <div className='label-item ask'></div>
                                <div className='title'>How to play HARDCORE</div>

                                <a rel="noopener noreferrer" target="_blank" href='https://www.degen.vc'>
                                    <div className='button medium'>MEDIUM</div>
                                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);