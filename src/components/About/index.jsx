import React, { PureComponent } from "react";
import { getEthAndHcoreBalance, sellHcore } from "../../actions";
import { connect } from "react-redux";
import "./style.scss";

class NFT extends PureComponent {
  componentDidMount() {
    const { getEthAndHcoreBalance } = this.props;
    getEthAndHcoreBalance();
  }

  render() {
    return (
      <main>
        <section className="About-page">
          <div className="about-section">
            <div className="header-about-section">About HARDCORE</div>
            <div className="about-section-description">
              <div>
                Breaking new ground, HARDCORE features a Liquid Vault smart
                contract that receives 3% of the 5% Fee on Transfer (FOT)
                revenue and 58% of HCORE supply, and to which anyone can send
                ETH in order to receive UNI-V2 LP tokens at a 20% discount and
                locked for just 7 days. ETH fees together with the other 2% of
                the FOT capitalise the Fund.
              </div>
              <div className="bold">
                HARDCORE forked MEME's smart contracts so that LP stakers can
                earn points to mine NFTs of spot the ball entries and win exotic
                cars.
              </div>
              <div>
                The{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.degen.vc/"
                >
                  Degen.VC
                </a>{" "}
                approach is to #alphadrop (airdrop) tokens to the DGVC LP and
                let the Uniswap market do the rest. This innovation has been
                covered in notable publications such as:
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.cointribune.com/actualites/fan-de-pepites-defi-en-route-pour-le-x20-degen-vc-vous-en-offre-gratuitement/"
                >
                  The Coin Tribune
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.altcoinbuzz.io/cryptocurrency-news/spotlight/degenvc-team-interview/"
                >
                  Altcoin Buzz
                </a>
                , and
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://irishtechnews.ie/degen-vc-delivers-alpha-fraser-brown-explains-more/"
                >
                  Irish Tech News
                </a>
                .
              </div>
            </div>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://medium.com/hcore"
            >
              <div className="button-about btn">MEDIUM</div>
            </a>
          </div>
          <div className="exotic-section">
            <div className="clock-wrapper">
              <div className="exotic-header">Exotic Prizes</div>
              <div className="exotic-description">
                HARDCORE spot the ball games will run consecutively. Players
                will need to unstake and stake again each time. Consider it like
                buying a ticket. Sometimes we will mix things up, for example,
                by offering a Rolex watch as the prize instead of a sports car.
              </div>
            </div>
          </div>

          <div className="about-page-header">Tokenomics</div>
          <div className="tokenomics-panel">
            <div className="block-1">
              <div className="block-header">DISTRIBUTION</div>
              <div className="block-row">
                <div className="block-item">
                  <div className="block-item-header">ALPHADROP</div>
                  <div className="block-item-value">7,500</div>
                </div>
                <div className="block-item">
                  <div className="block-item-header">VAULT</div>
                  <div className="block-item-value">17,395</div>
                </div>
                <div className="block-item small">
                  <div className="block-item-header">DEGEN.VC</div>
                  <div className="block-item-value">3,600</div>
                </div>
              </div>
            </div>

            <div className="block-2">
              <div className="block-header">$HCORE TOKEN</div>
              <div className="block-row">
                <div className="block-item">
                  <div className="block-item-header">TOKEN NAME</div>
                  <div className="block-item-value">HCORE.FINANCE</div>
                </div>
                <div className="block-item">
                  <div className="block-item-header">Total SUPPLY</div>
                  <div className="block-item-value">30,000 (capped)</div>
                </div>
                <div className="block-item">
                  <div className="block-item-header">BURNABLE</div>
                  <div className="block-item-value">Yes</div>
                </div>
                <div className="block-item">
                  <div className="block-item-header">TOKEN SYMBOL</div>
                  <div className="block-item-value">HCORE</div>
                </div>
                <div className="block-item">
                  <div className="block-item-header">MINTABLE</div>
                  <div className="block-item-value">No</div>
                </div>
                <div className="block-item xl">
                  <div className="block-item-header xl">TOKEN</div>
                  <div className="block-item-value">
                    <span>{`${"0x60a995cebcd44ca566ae22a9666ed28c67b598a1".slice(
                      0,
                      6
                    )}...${"0x60a995cebcd44ca566ae22a9666ed28c67b598a1".slice(
                      -4
                    )}`}</span>
                    <span
                      className="copy"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "0x60a995cebcd44ca566ae22a9666ed28c67b598a1"
                        );
                      }}
                    >
                      Copy
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="block-3">
                            <div className='block-header'>FEE ALLOCATION</div>
                            <div className='block-row'>
                                <div className='block-item'>
                                    <div className="block-item-header">VAULT</div>
                                    <div className="block-item-value">2%</div>
                                </div>
                                <div className='block-item'>
                                    <div className="block-item-header">NFT FUND</div>
                                    <div className="block-item-value">3%</div>
                                </div>
                            </div>
                        </div> */}
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
    getEthAndHcoreBalance: (value) => {
      dispatch(getEthAndHcoreBalance(value));
    },
    sellHcore: () => {
      dispatch(sellHcore());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NFT);
