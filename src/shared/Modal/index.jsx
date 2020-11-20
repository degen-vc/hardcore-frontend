import { Callbacks } from 'jquery';
import React, { PureComponent } from 'react';
import './style.scss'

class Modal extends PureComponent {
    render() {
        const { children, onClose, callback, name } = this.props;
        return (
            <div className={`modal ${name}`}>
                <div className='modal-body'>
                    {children}
                    <div className='button-wrap'>
                        {callback ? <div className='button done' onClick={callback}>OK</div> : null}
                        <div className='button cancel' onClick={onClose}>Close</div>
                    </div>
                    <div className='close' onClick={onClose}>+</div>
                </div>
            </div>
        )
    }
}

export default Modal;