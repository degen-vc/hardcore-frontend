import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import {testAction} from '../../actions';
import './style.scss';
import SpotTheBallPlugin from './SpotTheBallPlugin';

class SpotTheBall extends PureComponent{
  constructor(){
    super()
    this.state={
      valueOfBall: ''
    }
    this.setValueBall = this.setValueBall.bind(this)
  }

  setValueBall(value){
    this.setState({valueOfBall: value})
  }
  
    render(){
    const {valueOfBall} = this.state
      console.log('valueOfBall',valueOfBall)
        return (
            <main>
              <section>
                <div className='description'>
                  <h1>HOW TO WIN A LAMBO</h1>
                  <h3>THESE ARE THE STEPS:</h3>
                  <div className='description-item'>1. Mine points needed to claim your NFT. Learn more</div>
                  <div className='description-item'>2. Choose coordinate(s) below</div>
                  <div className='description-item'>3. Mint and claim your NFT(s). Learn more</div>
                  <div className='description-item'>4. Check if you are the winner after the judges have adjudicated!</div>
                </div>

                <SpotTheBallPlugin setValueBall={this.setValueBall}/>

                <div className='white-description'>
                  <div>
                    Once you have decided coordinates you must combine them in one string to mint your NFT.
                    Points are required to mint NFTs and a separate transaction is required for each NFT minted.
                  </div>
                  <div>
                    For example, if X = 738 and Y = 844 then the correct number (string) is 738844
                  </div>
                  <div className='button'>Mint NFT</div>
                  <div>
                    This button will be activated after the #alphadrop
                    If you want to practice and mint your NFT on the Ropstan test network (no points needed) 
                    you can do so here.
                  </div>
                </div>
              </section>
            </main>
        )
    }    
}

const mapStateToProps = state => {
  return {
 
  };
};

export default connect(mapStateToProps, {testAction})(SpotTheBall);