import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import {testAction} from '../../actions'

class SpotTheBall extends PureComponent{
  constructor(){
    super()
    
  }
  
    render(){
        return (
            <main>
              <section>
                Spot The Ball
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