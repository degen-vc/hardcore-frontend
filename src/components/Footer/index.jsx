import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";

import './style.scss'

class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <div className='header-title'>
                    <div className='title-item'>Community</div>
                    <div className='title-item'>Listings</div>
                </div>
                <div className='icon-items'>
                    <div className='block-1'>
                        <a rel="noopener noreferrer" target="_blank" href='https://twitter.com/hcorefinance'>
                            <div className='icon twitter'></div>
                        </a>
                        <a rel="noopener noreferrer" target="_blank" href='https://discord.gg/NNf3RSR46x'>
                            <div className='icon discord'></div>
                        </a>
                        <a rel="noopener noreferrer" target="_blank" href='https://t.me/hcorefinance'>
                            <div className='icon telegram'></div>
                        </a>
                        <a rel="noopener noreferrer" target="_blank" href='https://github.com/degen-vc'>
                            <div className='icon github'></div>
                        </a>
                        <a rel="noopener noreferrer" target="_blank" href='https://medium.com/hcore'>
                            <div className='icon medium2'></div>
                        </a>
                    </div>
                    <div className='block-2'>
                        <a rel="noopener noreferrer" target="_blank" href='https://app.uniswap.org/#/swap?inputCurrency=0x60a995cebcd44ca566ae22a9666ed28c67b598a1'>
                            <div className='icon medium3'></div>
                        </a>

                    
                        <a rel="noopener noreferrer" target="_blank" href='https://www.coingecko.com/en/coins/hardcore-finance'>
                            <div className='icon medium1'></div>
                        </a>

                    </div>
                </div>
                <div className='horizontal-line'></div>
                <div className='summary-information'>
                    <div>© 2020 Degen.VC</div>
                    <div className='wrap-summary'>
                        <div>Privacy Policy</div>
                        <div>Terms of Use</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;