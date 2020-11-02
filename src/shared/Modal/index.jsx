import React, { PureComponent } from 'react';
import './style.scss'

class Modal extends PureComponent {
    render() {
        const { children, onClose } = this.props;
        return (
            <div className='modal'>
                <div className='modal-body'>
                    <div>
                        {children}
                    </div>
                    <div className='button-wrap'>
                        <div className='button cancel' onClick={onClose}>Close</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;