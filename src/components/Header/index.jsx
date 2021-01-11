import React, { PureComponent, Fragment } from 'react'

import { NavLink } from "react-router-dom";

import { connect } from 'react-redux';
import { getAuth } from '../../actions'
import logo from '../../assets/images/logo.png'

import './style.scss'

class Header extends PureComponent {
    constructor() {
        super();
        this.state = {
            auth: false,
            hamburgerIsOpen: false
        }

        this.toLogin = this.toLogin.bind(this)
    }

    componentDidMount() {
        this.checkAuth()
    }

    checkAuth() {
        const ethereum = window.ethereum
        if (ethereum) {
            if (ethereum.selectedAddress !== null) {
                this.setState({ auth: ethereum.selectedAddress })
                localStorage.auth = ethereum.selectedAddress;
                this.props.getAuth();
            } else {
                const self = this
                this.setState({ auth: localStorage.auth })
                this.timeout = setTimeout(() => {
                    const ethereum = window.ethereum;
                    if (ethereum.selectedAddress !== null) {
                        self.setState({ auth: ethereum.selectedAddress })
                        localStorage.auth = ethereum.selectedAddress;
                        this.props.getAuth();
                    } else {
                        localStorage.auth = '';
                        self.setState({ auth: false })
                    }
                }, 400)
            }
        }
    }

    toLogin() {
        this.props.getAuth();
    }

    render() {
        const { auth, hamburgerIsOpen } = this.state;
        const { authorized } = this.props;
        const address = auth || authorized
        return (
            <Fragment>
                <header className='header'>
                    <img className='logo' src={logo} alt="" />
                    <nav className='navigation'>
                        <NavLink to='/home' className='item'>HOME</NavLink>
                        <NavLink to='/spot' className='item'>ABOUT</NavLink>
                        <NavLink to='/vault' className='item'>VAULT</NavLink>
                        <NavLink to='/nft' className='item'>GOVERNANCE</NavLink>
                    </nav>
                    {authorized || auth ? <div className='user-profile' onClick={() => { navigator.clipboard.writeText(authorized) }} >
                        <div className='profile-logo'></div>
                        <div className='user-address'>
                            {`${address.slice(0, 6)}...${address.slice(-4)}`}
                        </div>
                    </div>
                        :
                        <div className='button' onClick={this.toLogin}>CONNECT WALLET</div>}
                </header>
                <header className='header mobile'>
                    <img className='logo' src={logo} alt="" />
                    <div className={`checkbox ${hamburgerIsOpen ? 'active' : ''}`} onClick={() => { this.setState({ hamburgerIsOpen: !hamburgerIsOpen }) }}>
                        <div className="hamburger hamburger1">
                            <span className="bar bar1"></span>
                            <span className="bar bar2"></span>
                            <span className="bar bar3"></span>
                            <span className="bar bar4"></span>
                        </div>
                    </div>
                    <div className={`mobile-nav-body ${hamburgerIsOpen ? 'active' : ''}`}>
                        {authorized || auth ? <div className='user-profile' onClick={() => { navigator.clipboard.writeText(authorized) }} >
                            <div className='profile-logo'></div>
                            <div className='user-address'>
                                {`${address.slice(0, 6)}...${address.slice(-4)}`}
                            </div>
                        </div>
                            :
                            <div className='button' onClick={this.toLogin}>CONNECT WALLET</div>}
                        <nav className='navigation'>
                            <NavLink to='/home' className='item'>HOME</NavLink>
                            <NavLink to='/spot' className='item'>ABOUT</NavLink>
                            <NavLink to='/vault' className='item'>VAULT</NavLink>
                            <NavLink to='/nft' className='item'>GOVERNANCE</NavLink>
                        </nav>
                    </div>
                </header>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        authorized: state.auth.authorization
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAuth: () => {
            dispatch(getAuth());
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);