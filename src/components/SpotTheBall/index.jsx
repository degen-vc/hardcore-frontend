import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import {sendCoord} from '../../actions';
// import SpotTheBallPlugin from './SpotTheBallPlugin';
import './style.scss';

class SpotTheBall extends PureComponent{
  constructor(){
    super()
    this.state={
      valueOfBall: {
        x: 0,
        y: 0
      }
    }
    this.setValueBall = this.setValueBall.bind(this)
  }

  setValueBall(x,y){
    const result = {};
    result.x = x;
    result.y = y;
    this.setState({valueOfBall: result})
  }
  
    render(){
    const {valueOfBall: {x,y}} = this.state
    const {sendCoord} = this.props;
        return (
            <main>
              <section className='spot-the-ball-page'>
                <div className='description'>
                  <h1>HOW TO WIN A LAMBO</h1>
                  <h3>THESE ARE THE STEPS:</h3>
                  <div className='description-item'>1. Mine points needed to claim your NFT. Learn more</div>
                  <div className='description-item'>2. Choose coordinate(s) below</div>
                  <div className='description-item'>3. Mint and claim your NFT(s). Learn more</div>
                  <div className='description-item'>4. Check if you are the winner after the judges have adjudicated!</div>
                </div>

                {/* <SpotTheBallPlugin setValueBall={this.setValueBall}/> */}

                <div className='white-description'>
                  <div>
                    Once you have decided coordinates you must combine them in one string to mint your NFT.
                    Points are required to mint NFTs and a separate transaction is required for each NFT minted.
                  </div>
                  <div>
                    For example, if X = 738 and Y = 844 then the correct number (string) is 738844
                  </div>
                  <div className='button' onClick={()=>sendCoord(x,y)}>Mint NFT</div>
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

const mapDispatchToProps = dispatch => {
  return {
    sendCoord: (x,y) => {
          dispatch(sendCoord(x,y));
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotTheBall);