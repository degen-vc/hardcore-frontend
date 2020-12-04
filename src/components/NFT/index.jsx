import React, { PureComponent } from 'react';
import { getEthAndHcoreBalance, sellHcore} from '../../actions';
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
        const { liquidVault: {ethBalance, hCoreBalance} } = this.props;

        return (
            <main>
                <section className='NFT-page'>
                    <h1>NFT</h1>
                        <button onClick={() => this.props.sellHcore()}>Sell Hcore</button>
                    <div className='wrap-nft'>
                        <div className='score'>Hcore: { parseFloat(hCoreBalance).toFixed(3)}</div>
                        <div className='score'>ETH: { parseFloat(ethBalance).toFixed(3)}</div>
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