import React, { PureComponent } from 'react';
import './style.scss'

export default class Vault extends PureComponent {
    render(){
        return (
            <main>
               <section className='vault'>
                    <div className='description'>
                        <h1>VAULT</h1>
                        <h3>$HCORE TRANSFER FEES RECEIVED AND AVAILABLE NOW: 000</h3>
                        <div className='description-item'>Sent ETH and receive $HCORE/ETH-UNI-V2-LP tokens claimable after 30 days</div>
                        <br />
                        <div className='description-item'>MAXIMUM ETH THAT CAN BE SENT: 000</div>
                    </div>   
                    <div className='vault-button-wrap'>
                        <div className='button-vault'>
                            <h2>STAKE HCORE</h2>
                            <div className='white-line'></div>
                            <div className='hc-value'>$HCORE: 000</div>
                            <div className='discriptrion-value'>MAX STAKE: 000</div>
                            <div className='button'>Stake</div>
                        </div>
                        <div className='button-vault'>
                            <h2>STAKE HCORE</h2>
                            <div className='white-line'></div>
                            <div className='hc-value'>AVAILABLE $HCORE: 000</div>
                            <div className='discriptrion-value'>MAXIMUM ETH: 000</div>
                            <div className='button'>Send ETH</div>
                        </div>
                        <div className='button-vault'>
                            <h2>STAKE HCORE</h2>
                            <div className='white-line'></div>
                            <div className='hc-value'>CLAIMABLE: 000</div>
                            <div className='discriptrion-value'>NOT YET CLAIMABLE: 000</div>
                            <div className='button'>Claim LP</div>
                        </div>
                    </div>
                </section> 
            </main>
        )
    }
}