import React, { PureComponent, Fragment } from 'react'

import {  NavLink } from "react-router-dom";

import Modal from '../../shared/Modal';
import { connect } from 'react-redux';
import { getAuth } from '../../actions'

import './style.scss'

class Header extends PureComponent {
    constructor() {
        super();
        this.state = {
            auth: false,
            isProfileOpen: false
        }

        this.toLogin = this.toLogin.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
        this.renderModalBody = this.renderModalBody.bind(this)
    }

    componentDidMount() {
        this.checkAuth()
    }

    checkAuth(){
        const ethereum = window.ethereum
        if (ethereum) {
            if( ethereum.selectedAddress !== null){
                this.setState({ auth: ethereum.selectedAddress })
                localStorage.auth = ethereum.selectedAddress;
            }else{
                const self = this
                this.setState({ auth: localStorage.auth })
                this.timeout = setTimeout(()=>{
                    const ethereum = window.ethereum;
                    if (ethereum.selectedAddress !== null) {
                        self.setState({ auth: ethereum.selectedAddress })
                        localStorage.auth = ethereum.selectedAddress;
                    }else{
                        localStorage.auth = '';
                        self.setState({auth: false})
                    }
                },400) 
            }
        }
    }

    openModal() {
        this.setState({ isProfileOpen: true })
    }

    renderModalBody() {
        const { auth } = this.state;
        return (
            <Fragment>
                <div className='modal-title'>Profile</div>
                <div className='center'>Metamask id:</div>
                <div className='info'>{auth}</div>
            </Fragment>
        )
    }

    toLogin() {
        this.props.getAuth();
    }

    closeModal() {
        this.setState({ isProfileOpen: false })
    }

    render() {
        const { isProfileOpen, auth } = this.state;
        const { authorized } = this.props;
        return (
            <Fragment>
                <header className='header'>
                    <div className='logo'>logo</div>
                    {authorized || auth ?
                        <nav className='navigation'>
                            <NavLink to='/home' className='item'>Home</NavLink>
                            <NavLink to='/spot' className='item'>Spot the ball</NavLink>
                            <NavLink to='/vault' className='item'>Vault</NavLink>
                            <NavLink to='/nft' className='item'>NFT</NavLink>
                            <div className='profile button' onClick={this.openModal}>Profile</div>
                        </nav>
                        :
                        <div className='button' onClick={this.toLogin}>Login</div>
                    }
                </header>
                {isProfileOpen ? <Modal children={this.renderModalBody()} onClose={this.closeModal} /> : null}
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