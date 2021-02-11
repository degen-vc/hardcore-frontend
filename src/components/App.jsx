import React, { Component } from 'react';

import { Route } from "react-router-dom";

import About from './About';
import Governance from './Governance';
import Vault from './Vault';
import Header from './Header'
import Footer from './Footer'
import Home from './Home'

class App extends Component {
    render() {
        return (
            <div className="project">
                <Header />
                <Route path="/spot" exact component={About} />
                <Route path="/nft" exact component={Governance} />
                <Route path="/vault" exact component={Vault} />
                <Route path="/home" component={Home} />
                <Route exact path="/" component={Home} />
                <Footer />  
          </div>
        );
    }
} 

export default App;
