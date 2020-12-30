import React, { PureComponent } from 'react';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons';
import Game from '../SpotTheBall';
import './style.scss';

export default class Home extends PureComponent {
    constructor() {
        super()
        this.state = {
            time: 0
        }
    }

    componentDidMount() {
        this.setState({ time: 500000 })
        this.interval = setInterval(() => {
            let { time } = this.state;
            time--;
            this.setState({ time })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getExpiredTime(time) {
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
        if ((!days && !hours && !minutes && !seconds) || time <= 0) {
            return [0, 0, 0, 0]
        }

        return [days, hours, minutes, seconds]

    }


    render() {
        const { time } = this.state;
        const [days, hours, minutes, seconds] = this.getExpiredTime(time)
        return (
            <main className='home-page'>
                <section>
                    <div className='space'></div>
                    <div className='background-image'>
                        <div className='title'>Stake tokens to Win a Lambo</div>
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
                                <div className='button swap'></div>
                            </div>
                            <div className='item'>
                                <div className='number'>2</div>
                                <div className='title'>Pool DGVC on Uniswap</div>
                                <div className='button pool'></div>
                            </div>
                            <div className='item'>
                                <div className='number'>3</div>
                                <div className='title'>Wait for the #Alphadrop</div>
                                <div className='button degen'></div>
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
                                        <div className='stake-value'>00000000</div>
                                    </div>
                                    <div className='wrap-title second'>
                                        <div className='stake-title'>Point rate</div>
                                        <div className='stake-value'>2 Points / day</div>
                                    </div>
                                    <div className='wrap-title third'>
                                        <div className='stake-title'>Max stake</div>
                                        <div className='stake-value'>2.02</div>
                                    </div>
                                    <div className='wrap-title fourth'>
                                        <div className='stake-title'>Staked $HCORE LP</div>
                                        <div className='stake-value'>0000000</div>
                                    </div>
                                </div>
                                <div className='stake-body'>
                                    <div className='stake-input-wrap'>
                                        <input className='stake-input' type='text' placeholder='Amount' />
                                        <div className='stake-type'>LP</div>
                                    </div>
                                    <div className='stake-button'></div>
                                    <div className='unstake-button'></div>
                                </div>
                                <div className='stake-footer'>
                                    <div className='stake-wrap-more'>
                                        <div className='stake-more'>Learn more <div>&#8250;</div></div>
                                        <div className='stake-more'>Learn more <div>&#8250;</div></div>
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
                                <div className='button swap'></div>
                            </div>
                            <div className='item'>
                                <div className='label-item money'></div>
                                <div className='title'>Pool $HCORE on Uniswap</div>
                                <div className='button pool'></div>
                            </div>
                            <div className='item'>
                                <div className='label-item ask'></div>
                                <div className='title'>How to play HARDCORE</div>
                                <div className='button medium'></div>
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