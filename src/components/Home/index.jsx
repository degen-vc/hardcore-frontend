import React, { PureComponent } from 'react';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
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
            <main>
                <section>
                    <div className='background-image'>
                        <div className='title'>This is an info site only. Our web3 site will be published at hcore.finance soon.</div>
                        <div className='title'>Any Ethereum facing links on this site are, of course, inactive.</div>
                        <div className='shadow-wrap'>
                            <div className='title'>Are you ready for the</div>
                            <div className='name'>HARDCORE</div>
                            <div className='red-text'>#alphadrop?</div>
                        </div>
                    </div>

                    <div className='content-wrap'>
                        <div className='text-content'>
                            <div className='header-title'>
                                <div className='red-text'>HARDCORE</div>
                                <div className='horizontal-line'></div>
                                <div className='description-title'>by Degen.VC</div>
                            </div>
                            <div className='description-wrap'>
                                <p>Breaking new ground, HARDCORE features a vault smart contract that receives 2% of the 5% Fee on Transfer (FOT) revenue and to which anyone can send ETH in order to receive UNI-V2 LP tokens (i.e. nearly 50% discounted), which are automatically locked for one month.</p>
                                <p>What sets HARDCORE apart even more is that LP stakers can earn points with UNI-V2 LP that can be used to mine NFTs to win exotic cars. These rewards are acquired by the NFT fund smart contract using the other 3% of the fee revenue.</p>
                                <p>The Degen.VC approach is to #alphadrop (airdrop) tokens to the DGVC LP and let the Uniswap market do the rest. This innovation has been covered in notable publications such as: The Coin Tribune; Altcoin Buzz, and Irish Tech News</p>
                                <p>This. Is. HARDCORE</p>
                            </div>
                            <div className='oclock-button'>MEDIUM</div>
                        </div>
                        <div>
                            <div className='clock-image'></div>
                            <div className='clock-description'>
                                <div className='title'>Timing is everything</div>
                                <div className='clock-title'>Trump might not have won, but Bitcoin has. HARDCORE is a tool for Degens. The more degens play, the more lambos ship.</div>
                            </div>
                        </div>


                    </div>
                    <div className='paralax'>
                        <div className='steps'>
                            <div className='title'>HOW TO GET THE $HCORE #ALPHADROP</div>
                            <div className='blocks'>
                                <div className='block red'>1</div>
                                <div className='block'>2</div>
                                <div className='block red'>3</div>
                            </div>
                            <div className='blocks'>
                                <div className='small block'>BUY DGVC ON UNSWAP</div>
                                <div className='small block red'>POOL DGVC ON UNISWAP</div>
                                <div className='small block'>WAIT FOR THE #ALPHADROP</div>
                            </div>
                        </div>

                        <div className='time-remaining'>
                            <div className='title'>Approximate time remaining to #alphadrop</div>
                            <div>
                                <div className='time-wrap'>
                                    <div>{days}</div>
                                    <div>{hours}</div>
                                    <div>{minutes}</div>
                                    <div>{seconds}</div>
                                </div>
                                <div className='time-description'>
                                    <div>Days</div>
                                    <div>Hours</div>
                                    <div>Mins</div>
                                    <div>Secs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='win-types'>
                        <div className='type car'>
                            <div className='blur'>
                                <div className='title'>
                                    <div>Win</div>
                                    <div>exotic cars</div>
                                </div>
                                <div className='button'>Learn more</div>
                            </div>
                        </div>
                        <div className='type watch'>
                            <div className='blur'>
                                <div className='title'>
                                    <div>Win fine</div>
                                    <div>watches</div>
                                </div>
                                <div className='button'>Learn more</div>
                            </div>
                        </div>
                        <div className='type procent'>
                            <div className='blur'>
                                <div className='title'>
                                    <div>Win</div>
                                    <div>crypto</div>
                                </div>
                                <div className='button'>Learn more</div>
                            </div>
                        </div>
                    </div>
                    <div className='photos'>
                        <div>
                            <div className='photo fraser'></div>
                            <div className='name'>Fraser Brown</div>
                            <div className='description-photo'>Co-founder • Degen.VC</div>
                            <div className='social'><TwitterOutlined /> In</div>
                        </div>
                        <div>
                            <div className='photo paul'></div>
                            <div className='name'>Paul Scott</div>
                            <div className='description-photo'>Co-founder • Degen.VC</div>
                            <div className='social'><TwitterOutlined /> In</div>
                        </div>
                        <div>
                            <div className='photo justin'></div>
                            <div className='name'>Justin Goro</div>
                            <div className='description-photo'>Senior Dev • Degen.VC</div>
                            <div className='social'><TwitterOutlined /> In</div>
                        </div>
                        <div>
                            <div className='photo richard'></div>
                            <div className='name'>Richard Parker</div>
                            <div className='description-photo'>Community • Degen.VC</div>
                            <div className='social'><TwitterOutlined /> In</div>
                        </div>
                    </div>
                    <div className='tokenomix'>
                        <div className='title'>TOKENOMICS</div>
                        <div className='background'>
                            <div className='blur'>
                                <div className='columns'>
                                    <div>
                                        <div className='title red'>FEE ALLOCATION</div>
                                        <div className='horizontal-line red'></div>
                                        <div className='step'>Vault: 2%</div>
                                        <div className='step'>NFT Fund: 3%</div>
                                        <div className='step'>Marketing Agency: 5% ETH sent to vault</div>
                                    </div>
                                </div>
                                <div className='columns red'>
                                    <div>
                                        <div className='title'>$HCORE TOKEN</div>
                                        <div className='horizontal-line'></div>
                                        <div className='step'>Token Name: HCORE.FINANCE</div>
                                        <div className='step'>Token Symbol: HCORE</div>
                                        <div className='step'>Total Supply: 30,000 (capped)</div>
                                        <div className='step'>Mintable: No</div>
                                        <div className='step'>Burnable: Yes</div>
                                        <div className='step'>Token address: TBA</div>
                                    </div>
                                </div>
                                <div className='columns'>
                                    <div>
                                        <div className='title red'>DISTRIBUTION</div>
                                        <div className='horizontal-line red'></div>
                                        <div className='step'>ALPHADROP: 85%</div>
                                        <div className='step'>DEGEN.VC: 15%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='question-block'>
                            <div className='question'>Any questions? Please head over to our telegram group</div>
                            <div className='button'>Telegram</div>
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='wrap'>
                            <div className='community'>
                                <div className='title'>COMMUNITY</div>
                                <div className='empty'>//////</div>
                                <div className='icons'><TwitterOutlined /> <YoutubeOutlined /> <FacebookOutlined /></div>
                            </div>
                            <div className='listings'>
                                <div className='title'>LISTINGS</div>
                                <div className='empty'>//////</div>
                                <div className='description-title'>COMING SOON!</div>
                                <div className='icons'><TwitterOutlined /> <YoutubeOutlined /></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}