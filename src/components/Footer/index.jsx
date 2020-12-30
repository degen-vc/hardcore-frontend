import React, { PureComponent } from 'react';


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
                        <div className='icon twitter'></div>
                        <div className='icon discord'></div>
                        <div className='icon telegram'></div>
                        <div className='icon github'></div>
                        <div className='icon medium2'></div>
                    </div>
                    <div className='block-2'>
                        <div className='icon medium1'></div>
                        <div className='icon medium3'></div>
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