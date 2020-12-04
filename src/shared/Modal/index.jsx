import React, { PureComponent } from 'react';
import './style.scss'

class Modal extends PureComponent {
    render() {
        const { children, onClose, callback, name, confirmName } = this.props;
        return (
            <div className={`modal ${name}`}>
                <div className='modal-body'>
                    {children}
                    <div className='button-wrap'>
                        <div className='button cancel' onClick={onClose}>Close</div>
                        {callback ? <div className='button done' onClick={() => callback()}>{confirmName ? confirmName : 'OK'}</div> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;