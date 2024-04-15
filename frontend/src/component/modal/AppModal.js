import React from 'react';
import { Modal } from 'react-bootstrap';


function AppModal({ isOpen, onClose, closeButtonText,children }){ 
    return (
        <>
          <Modal show={isOpen} onHide={onClose}> 
            <Modal.Body>
              {children}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-primary" onClick={onClose}>{closeButtonText}</button>
            </Modal.Footer>
          </Modal>
        </>
    );
}
export default AppModal;