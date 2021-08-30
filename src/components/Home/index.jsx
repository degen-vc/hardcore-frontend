import React, { PureComponent } from "react";
import Game from "../SpotTheBall";
import { connect } from "react-redux";
import {
  getAuth,
  purchaseLP,
  claim,
  getLockedLP,
  stake,
  unStake,
  unStakePrevious,
} from "../../actions";
import "./style.scss";

class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      globalTime: 0,
      inputEth: "",
      timeStake: 0,
      popupOpen: false,
    };
    this.stakeLp = this.stakeLp.bind(this);
  }

  componentDidMount() {
    this.setState({
      globalTime: 1613058090 - new Date().getTime() / 1000,
      timeStake: 1614254400 - new Date().getTime() / 1000,
    });
    this.interval = setInterval(() => {
      // let { globalTime, timeStake } = this.state;
      // globalTime--;
      // timeStake--
      // this.setState({ globalTime, timeStake })
      this.props.getLockedLP();
    }, 60000);
    this.props.getLockedLP();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getExpiredTime(time) {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (time / 86400 >= 1) {
      days = time / 86400;
      days = Math.trunc(days);
    }
    if (days) {
      time -= days * 86400;
    }
    if (time / 3600 >= 1) {
      hours = time / 3600;
      hours = Math.trunc(hours);
    }
    if (hours) {
      time -= hours * 3600;
    }
    if (time / 60 >= 1) {
      minutes = time / 60;
      minutes = Math.trunc(minutes);
    }
    if (minutes) {
      time -= minutes * 60;
    }
    seconds = Math.round(time);
    if ((!days && !hours && !minutes && !seconds) || time <= 0) {
      return [0, 0, 0, 0];
    }

    return [days, hours, minutes, seconds];
  }
  stakeLp() {
    const { stake } = this.props;
    const { inputEth } = this.state;
    if (+inputEth && inputEth.length > 0) {
      stake(inputEth);
      this.setState({ inputEth: "" });
    } else {
      alert("Type a number");
    }
  }

  changeInput(e) {
    this.setState({ inputEth: e.target.value });
  }

  render() {
    const { globalTime, timeStake, inputEth, popupOpen } = this.state;
    const [days, hours, minutes, seconds] = this.getExpiredTime(globalTime);
    const [days1, hours1, minutes1, seconds1] = this.getExpiredTime(timeStake);
    const {
      liquidVault: { maxStake, myPoints, HcoreLP, myHcoreLp },
      unStake,
      unStakePrevious,
      authorized,
      getAuth,
    } = this.props;
    return (
      <main className="home-page">
        <section>
          <div className="space"></div>
          <div className="background-image">
            <div className="title">Stake LP Tokens to Win Exotic Prizes.</div>
            {authorized ? (
              <div
                className="play-button btn"
                onClick={() => {
                  window.scrollTo(0, 2020);
                }}
              >
                BUY
              </div>
            ) : (
              <div className="btn connect-button" onClick={getAuth}>
                CONNECT METAMASK
              </div>
            )}
          </div>
          {/* <div className="alphadrop-notification">
            Liquid Vault:{" "}
            {`${days}D ${
              hours === 0 ? "00" : hours < 10 ? "0" + hours : hours
            }:${
              minutes === 0 ? "00" : minutes < 10 ? "0" + minutes : minutes
            }:${seconds < 10 ? "0" + seconds : seconds}`}{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://medium.com/hcore/send-eth-to-the-liquid-vault-claim-lp-tokens-53327b815e9b"
            >
              Learn more
            </a>
          </div> */}
          {/* <div className='content-wrap'>
                        <div className='car-image'>

                        </div>
                        <div className='wrap-items'>
                            <div className='item'>
                                <div className='number'>1</div>
                                <div className='title'>Swap ETH/DGVC on Uniswap</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/swap?inputCurrency=0x26E43759551333e57F073bb0772F50329A957b30'>
                                    <div className='button btn swap'>SWAP</div>
                                </a>
                            </div>
                            <div className='item'>
                                <div className='number'>2</div>
                                <div className='title'>Pool DGVC on Uniswap</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/add/ETH/0x26E43759551333e57F073bb0772F50329A957b30'>
                                    <div className='button btn pool'>POOL</div>
                                </a>
                            </div>
                            <div className='item'>
                                <div className='number'>3</div>
                                <div className='title'>Wait for the #Alphadrop</div>
                                <a rel="noopener noreferrer" target="_blank" href='https://www.degen.vc'>
                                    <div className='button btn degen'>DEGEN.VC</div>
                                </a>

                            </div>
                        </div>
                    </div> */}

          <div className="stake-block">
            <div className="title">Stake to earn points</div>
            <div className="vault-notification">
              Game 1 starts:{" "}
              {`${days1}D ${
                hours1 === 0 ? "00" : hours1 < 10 ? "0" + hours1 : hours1
              }:${
                minutes1 === 0
                  ? "00"
                  : minutes1 < 10
                  ? "0" + minutes1
                  : minutes1
              }:${seconds1 < 10 ? "0" + seconds1 : seconds1}`}
            </div>
            <div className="stake-panel">
              <div className="stake">
                <div className="stake-header">
                  <div className="wrap-title first">
                    <div className="stake-title">Your $HCORE LP</div>
                    <div className="stake-value">{myHcoreLp}</div>
                  </div>
                  <div className="wrap-title second">
                    <div className="stake-title">Point rate</div>
                    <div className="stake-value">1 Point / day</div>
                  </div>
                  <div className="wrap-title third">
                    <div className="stake-title">Max stake</div>
                    <div className="stake-value">{maxStake}</div>
                  </div>
                  <div className="wrap-title fourth">
                    <div className="stake-title">Staked $HCORE LP</div>
                    <div className="stake-value">
                      {Number(HcoreLP).toFixed(5)}
                    </div>
                  </div>
                </div>
                <div className="stake-body">
                  <div className="stake-input-wrap">
                    <input
                      className="stake-input"
                      type="text"
                      placeholder="Amount"
                      onChange={(e) => this.changeInput(e)}
                      value={inputEth}
                    />
                    <div className="stake-type">LP</div>
                  </div>
                  <div
                    className={`stake-button btn ${
                      !+inputEth || +inputEth > maxStake ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (inputEth > 0 && inputEth < maxStake) {
                        this.stakeLp();
                      }
                    }}
                  >
                    STAKE
                  </div>
                  <div
                    className={`unstake-button btn ${
                      HcoreLP <= 0 ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (HcoreLP > 0) {
                        unStake();
                      }
                    }}
                  >
                    UNSTAKE
                  </div>
                  {/* <div className='stake-button btn' onClick={()=>{this.setState({popupOpen: true})}}>STAKE</div>
                                    <div className='unstake-button btn' onClick={()=>{this.setState({popupOpen: true})}}>UNSTAKE</div> */}
                </div>
                <div className="stake-footer">
                  <div className="stake-wrap-more">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://medium.com/hcore/stake-uni-v2-lp-hcore-eth-635d163c1a48"
                    >
                      <div className="stake-more">
                        Learn more <div>&#8250;</div>
                      </div>
                    </a>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://medium.com/hcore/unstake-uni-v2-lp-hcore-eth-5a2af3c4b501"
                    >
                      <div className="stake-more">
                        Learn more <div>&#8250;</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="stake-panel-mobile">
              <div className="wrap-row">
                <div className="wrap-title-1">
                  <div className="stake-title">Point rate</div>
                  <div className="stake-value">1 Point / day</div>
                </div>

                <div className="wrap-title-2">
                  <div className="stake-title">Max stake</div>
                  <div className="stake-value">{maxStake}</div>
                </div>
              </div>
              <div className="wrap-row">
                <div className="stake-input-wrap">
                  <input
                    className="stake-input"
                    type="text"
                    placeholder="Amount"
                    onChange={(e) => this.changeInput(e)}
                    value={inputEth}
                  />
                  <div className="stake-type">LP</div>
                </div>
                <div className="wrap-title-2">
                  <div className="stake-title">Your $HCORE LP</div>
                  <div className="stake-value">{HcoreLP}</div>
                </div>
              </div>
              <div className="stake-button btn" onClick={this.stakeLp}>
                STAKE
              </div>
              {/* <div className='stake-button btn' onClick={()=>{this.setState({popupOpen: true})}}>STAKE</div> */}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://medium.com/hcore/stake-uni-v2-lp-hcore-eth-635d163c1a48"
              >
                <div className="stake-more">
                  Learn more <div>&#8250;</div>
                </div>
              </a>
            </div>
            <div className="stake-panel-mobile">
              <div className="wrap-row">
                <div className="wrap-title-3">
                  <div className="stake-title">Staked $HCORE LP</div>
                  <div className="stake-value">
                    {parseFloat(myPoints).toFixed(4)}
                  </div>
                </div>
              </div>
              <div className="unstake-button btn" onClick={unStake}>
                UNSTAKE
              </div>
              {/* <div className='unstake-button btn' onClick={()=>{this.setState({popupOpen: true})}}>UNSTAKE</div> */}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://medium.com/hcore/unstake-uni-v2-lp-hcore-eth-5a2af3c4b501"
              >
                <div className="stake-more">
                  Learn more <div>&#8250;</div>
                </div>
              </a>
            </div>

            <div className="stake-link" onClick={unStakePrevious}>
              Unstake from previous games <div>&#8250;</div>
            </div>
            {/* <div className='stake-link' onClick={()=>{this.setState({popupOpen: true})}}>Unstake from previous games <div>&#8250;</div></div> */}
          </div>
          <div className="game">
            <div className="game-header">Play Spot the Ball</div>
            <Game />
          </div>
          <div className="news-hardcore">
            <div className="news-title">New to HARDCORE?</div>
            <div className="uniswap-notification">
            Sushiswap is LIVE! Set slippage tolerance to 5%
            </div>
            <div className="wrap-items bottom">
              <div className="item">
                <div className="label-item arrows"></div>
                <div className="title">Swap $HCORE on Uniswap</div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://app.uniswap.org/#/swap?inputCurrency=0x60a995cebcd44ca566ae22a9666ed28c67b598a1"
                >
                  <div className="button btn swap">SWAP</div>
                </a>
                {/* <div className='button btn swap' onClick={() => { this.setState({ popupOpen: true }) }}>SWAP</div> */}
              </div>
              <div className="item">
                <div className="label-item money"></div>
                <div className="title">Pool $HCORE on Uniswap</div>

                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://app.uniswap.org/#/add/ETH/0x60a995cebcd44ca566ae22a9666ed28c67b598a1"
                >
                  <div className="button btn pool">POOL</div>
                </a>
                {/* <div className='button btn pool' onClick={() => { this.setState({ popupOpen: true }) }}>POOL</div> */}
              </div>
              <div className="item">
                <div className="label-item ask"></div>
                <div className="title">How to play HARDCORE</div>

                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://medium.com/hcore"
                >
                  <div className="button btn medium">MEDIUM</div>
                </a>
              </div>
            </div>
          </div>
          <div className="question-block">
            <div className="question">
              Any questions? Please head over to our telegram group
            </div>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://t.me/hcorefinance"
            >
              <div className="button btn">TELEGRAM</div>
            </a>
          </div>
        </section>
        {popupOpen ? (
          <div className="pop-up">
            <div className="pop-up-body">
              <div className="text-pop-up">Will be live soon</div>
              <div
                className="pop-up-button"
                onClick={() => {
                  this.setState({ popupOpen: false });
                }}
              >
                OK
              </div>
            </div>
          </div>
        ) : null}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    liquidVault: state.liquidVault,
    authorized: state.auth.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
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
      dispatch(stake(value));
    },
    unStake: () => {
      dispatch(unStake());
    },
    unStakePrevious: () => {
      dispatch(unStakePrevious());
    },
    getAuth: () => {
      dispatch(getAuth());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
