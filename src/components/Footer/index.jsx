import React, { PureComponent } from 'react';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';


import './style.scss'

class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <div className='social-icons'>
                    <a rel="noopener noreferrer" target="_blank" href='https://twitter.com/' >
                        <TwitterOutlined />
                    </a>
                    <a rel="noopener noreferrer" target="_blank" href='https://www.facebook.com/' >
                        <FacebookOutlined />
                    </a>
                    <a rel="noopener noreferrer" target="_blank" href='https://www.youtube.com/' >
                        <YoutubeOutlined />
                    </a>
                </div>
            </footer>
        )
    }
}

export default Footer;