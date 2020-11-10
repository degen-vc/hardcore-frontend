import React, { Component } from 'react';

import { Route, Redirect } from "react-router-dom";

import SpotTheBall from './SpotTheBall';
import NFT from './NFT';
import Vault from './Vault';
import Header from './Header'
import Footer from './Footer'
import Home from './Home'

class App extends Component {
    render() {
        return (
            <div className="project">
                <Header />
                <Route path="/spot" exact component={SpotTheBall} />
                <Route path="/nft" exact component={NFT} />
                <Route path="/vault" exact component={Vault} />
                <Route path="/home" component={Home} />
                <Route path="/"><Redirect to="/home" /></Route>
                <Footer />  
          </div>
        );
    }
} 

export default App;
