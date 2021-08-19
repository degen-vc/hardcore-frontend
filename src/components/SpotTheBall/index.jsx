import React, { PureComponent } from "react";
import { TweenMax } from "gsap";
import { connect } from "react-redux";
import { sendCoord, getAuth, getBalance } from "../../actions";
import gameImage from "../../assets/gameImage.jpg";
import "./style.scss";

class SpotTheBall extends PureComponent {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      selectedX: undefined,
      selectedY: undefined,
      pressButton: false,
      startPlay: false,
      timeStake: 0,
    };
    this.myRef = React.createRef();
    this.moveCircle = this.moveCircle.bind(this);
    this.enterCircle = this.enterCircle.bind(this);
    this.leaveCircle = this.leaveCircle.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }
  componentDidMount() {
    this.props.getBalance();
    this.myRef = this.myRef.current;
    this.circle = this.myRef.lastChild.firstChild;
    this.coordinateLine = this.myRef.lastChild.childNodes[1].firstChild;
    this.offsetX = this.myRef.getBoundingClientRect().x - 0.5;
    this.scale = 1.5;
    this.leftPosition = true;
    this.topPositin = true;

    this.setState({ timeStake: 1614254400 - new Date().getTime() / 1000 });
    // this.interval = setInterval(() => {
    //     let { globalTime,timeStake } = this.state;
    //     globalTime--;
    //     timeStake--
    //     this.setState({ globalTime,timeStake })
    // }, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
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
  setPosition(e) {
    const width = this.mobile ? 360 : 778;
    const height = this.mobile ? 260 : 556;
    const clientX =
      this.mobile && e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY =
      this.mobile && e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    let x = clientX - this.offsetX;
    let y = clientY - this.offsetY;
    if (y < height && y >= 0 && x < width && x > 0) {
      this.setState({
        selectedX: Math.floor(this.mobile ? x * 2.155 : x),
        selectedY: Math.floor(this.mobile ? y * 2.155 : y),
      });
      this.circle.style.left = `${x - 9}px`;
      this.circle.style.top = `${y - 9}px`;
    }
  }

  enterCircle() {
    TweenMax.to(["#masker", "#imgZoom"], 0.3, { alpha: 1 });
  }

  leaveCircle() {
    TweenMax.to(["#masker", "#imgZoom"], 0.3, { alpha: 0 });
  }

  moveCircle(e) {
    if (!this.state.x) {
      this.setState({ startPlay: !this.state.startPlay });
    }

    const width = this.mobile ? 360 : 778;
    const height = this.mobile ? 260 : 556;
    const pressButton = this.mobile ? true : this.state.pressButton;
    const clientX =
      this.mobile && e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY =
      this.mobile && e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    const x = clientX - this.offsetX;
    const y = clientY - this.offsetY;
    if (x < 110) {
      this.coordinateLine.style.left = "60px";
      this.leftPosition = false;
    } else if (!this.leftPosition) {
      this.coordinateLine.style.left = "-70px";
    }
    if (y < 45) {
      this.coordinateLine.style.top = "80px";
      this.topPosition = false;
    } else if (!this.topPosition) {
      this.coordinateLine.style.top = "-20px";
    }
    if (pressButton && x < width && y < height && x > 0) {
      this.circle.style.left = `${x - 7}px`;
      this.circle.style.top = `${y - 7}px`;
    }
    if (x > 0 && y > 0 && x < width && y < height) {
      this.setState({
        x: Math.floor(this.mobile ? x * 2.155 : x),
        y: Math.floor(this.mobile ? y * 2.155 : y),
      });
      TweenMax.to(".sight", 0.3, {
        x: clientX - this.offsetX - 41.5,
        y: clientY - this.offsetY - 41.5,
      });
      TweenMax.to("#masker", 0.3, {
        attr: { cx: -this.offsetX + clientX, cy: -this.offsetY + clientY },
      });
      TweenMax.to("#imgZoom", 0.3, {
        attr: {
          x: this.offsetX * (this.scale - 1) - clientX * (this.scale - 1),
          y: this.offsetY * (this.scale - 1) - clientY * (this.scale - 1),
        },
      });
    }
  }

  renderPlayButton(balance, need, sendCoord, myBalanceHcore, myHcoreLp) {
    const { selectedX, selectedY } = this.state;
    if (+balance !== 0 && +balance < +need) {
      return (
        <div className="not-authorized">
          <div className="auth-message">
            Be patient. Your points balance is growing
          </div>
          <div className="not-enough-button btn">NOT ENOUGH POINTS</div>
        </div>
      );
    } else if (!+balance && !+myHcoreLp) {
      return (
        <div className="not-authorized">
          <div className="auth-message">HCORE LP tokens are needed to play</div>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://app.uniswap.org/#/add/ETH/0x740E9F161f4DF6D9027b35cB2AEc4A0137B5a36b"
          >
            <div className="get-tokens-button btn">GET TOKENS</div>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://medium.com/hcore/how-to-claim-a-spot-the-ball-nft-5fa99d3fc3e6"
          >
            <div className="stake-more">
              Learn more <div>&#8250;</div>
            </div>
          </a>
        </div>
      );
    } else if (+balance === 0 && +myHcoreLp) {
      return (
        <div className="not-authorized">
          <div className="auth-message">Stake to earn points</div>
          <div
            className="get-tokens-button btn"
            onClick={() => {
              window.scrollTo(0, 850);
            }}
          >
            STAKE
          </div>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://medium.com/hcore/how-to-claim-a-spot-the-ball-nft-5fa99d3fc3e6"
          >
            <div className="stake-more">
              Learn more <div>&#8250;</div>
            </div>
          </a>
        </div>
      );
    } else {
      return (
        <div className="not-authorized">
          <div className={`auth-message ${selectedX >= 0 ? "" : "error"}`}>{`${
            selectedX >= 0
              ? "Claim these coordinates as an NFT"
              : "Choose your coordinate before play"
          }`}</div>
          {selectedX ? (
            <div
              className="play-button btn"
              onClick={() => sendCoord(selectedX, selectedY)}
            >
              PLAY
            </div>
          ) : (
            <div className="play-button btn">PLAY</div>
          )}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://medium.com/hcore/how-to-claim-a-spot-the-ball-nft-5fa99d3fc3e6"
          >
            <div className="stake-more">
              Learn more <div>&#8250;</div>
            </div>
          </a>
        </div>
      );
    }
  }

  render() {
    const {
      sendCoord,
      liquidVault: { myBalanceHcore, myHcoreLp },
      balance: { balance, need },
    } = this.props;

    const { selectedX, selectedY, x, y, timeStake } = this.state;
    const [days1, hours1, minutes1, seconds1] = this.getExpiredTime(timeStake);
    if (window.innerWidth <= 420) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    if (this.myRef.current) {
      this.circle = this.myRef.lastChild.firstChild;
      this.coordinateLine = this.myRef.lastChild.childNodes[1].firstChild;
      this.offsetX = this.myRef.getBoundingClientRect().x - 0.5;
      this.offsetY = this.myRef.getBoundingClientRect().y - 0.5;
    }
    const width = this.mobile ? 360 : 780;
    const height = this.mobile ? 260 : 560;
    const { authorized, getAuth } = this.props;
    return (
      <div className="stb-wrapper">
        <div className={`wrap-plugin ${this.mobile ? "" : ""}`}>
          <div
            id="uvelichekniye-lupy"
            ref={this.myRef}
            className={`grednsoledes ${this.mobile ? "" : ""}`}
            onMouseMove={this.moveCircle}
            onMouseLeave={this.leaveCircle}
            onMouseEnter={this.enterCircle}
            onClick={this.setPosition}
            onMouseDown={() => {
              this.setState({ pressButton: true });
            }}
            onMouseUp={() => {
              this.setState({ pressButton: false });
            }}
            onTouchEnd={this.setPosition}
            onTouchMove={this.moveCircle}
          >
            <img className="img grednsoledes" src={gameImage} />

            <div className="svgWrapper">
              <div className="cross">
                <div className="line h"></div>
                <div className="line v"></div>
              </div>

              <div className="sight">
                <div className="position">{`X: ${x} Y: ${y}`}</div>
                <div className="cross">
                  <div className="line h"></div>
                  <div className="line v"></div>
                </div>
                <div className="line horizontal l" />
                <div className="line horizontal r" />
                <div className="line vertical t" />
                <div className="line vertical b" />
              </div>
              <svg
                id="svgRoot"
                width={width}
                height={height}
                version="1.1"
                xmlns="https://www.w3.org/2000/svg"
                link="https://www.w3.org/1999/xlink"
              >
                <defs id="defs">
                  <mask id="m1">
                    <circle id="masker" cx="0" cy="0" r="40" fill="#fff" />
                  </mask>
                </defs>
                <image
                  id="imgZoom"
                  mask="url(#m1)"
                  x="0"
                  y="0"
                  width={width * 1.5}
                  height={height * 1.5}
                  href={gameImage}
                ></image>
              </svg>
            </div>
          </div>
        </div>

        <div className="stb-points">
          <div className="game-title">Choose your coordinate </div>
          <div className="coordinate-wrap">
            <div className="coordinate">
              {` X:${selectedX >= 0 ? selectedX : "----"}`}
            </div>
            <div className="coordinate">
              {` Y:${selectedY >= 0 ? selectedY : "----"}`}
            </div>
          </div>
          <div className="game-points">
            <div className="game-point-title">Min points to play</div>
            <div className="game-point-value">
              {parseFloat(need).toFixed(4)}
            </div>
          </div>
          <div className="game-points">
            <div className="game-point-title">Your points</div>
            <div className="game-point-value">
              {parseFloat(balance).toFixed(4)}
            </div>
          </div>
          {/* <div className='not-authorized'>
                    <div className='vault-notification small'>Game 1 starts:</div>
                    <div className='vault-notification'> {`${days1}D ${hours1 === 0 ? '00' : hours1 < 10 ? '0' + hours1 : hours1}:${minutes1 === 0 ? '00' : minutes1 < 10 ? '0' + minutes1 : minutes1}:${seconds1 < 10 ? '0' + seconds1 : seconds1}`}</div>
                    <a rel="noopener noreferrer" target="_blank" href='https://kovan.hcore.finance'>
                        <div className='play-button btn'>Play on testnet</div>
                    </a>
                    </div> */}

          {!authorized ? (
            <div className="not-authorized">
              <div className="auth-message">Please connect to Metamask</div>
              <div className="button-connect" onClick={getAuth}></div>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://medium.com/hcore/how-to-claim-a-spot-the-ball-nft-5fa99d3fc3e6"
              >
                <div className="stake-more">
                  Learn more <div>&#8250;</div>
                </div>
              </a>
            </div>
          ) : (
            this.renderPlayButton(
              balance,
              need,
              sendCoord,
              myBalanceHcore,
              myHcoreLp
            )
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    balance: state.getBalance,
    liquidVault: state.liquidVault,
    authorized: state.auth.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCoord: (x, y) => {
      dispatch(sendCoord(x, y));
    },
    getAuth: () => {
      dispatch(getAuth());
    },
    getBalance: () => {
      dispatch(getBalance());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotTheBall);
