"use client";
import { FC } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

interface JoinWalletModalProps {
  show: boolean;
  handleClose: () => void;
}

const JoinWalletModal: FC<JoinWalletModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className='close_btn'>
          <img src="/images/Xbtn.png" alt="Close Button" style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={handleClose} />
       </div>
        <div className='modal_body'>
          <div className='w-50'>
            <form action="">
              <h2>Join Waitlist</h2>
              <Row>
                <Col md={6}>
                  <label htmlFor="firstName">First name</label>
                  <input type="text" id="firstName" />
                </Col>
                <Col md={6}>
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" id="lastName" />
                </Col>
                <Col md={12}>
                  <label htmlFor="email">Email address</label>
                  <input type="email" id="email" />
                </Col>
                <Col md={12}>
                  <label htmlFor="phone">Phone No.</label>
                  <input type="number" id="phone" />
                </Col>
                <Col md={12}>
                  <div className='checkbox'>
                     <input type="checkbox" id="subscribe" />
                     <label htmlFor="subscribe">Subscribe to the mail to get daily updates.</label>
                  </div>
                </Col>
                <Col md={12}>
                  <Button variant="primary" type="submit">Join Now</Button>
                </Col>
              </Row>
            </form>
          </div>
          <div className='w-50 vidio'>
          <video width="100%"  autoPlay loop height="100%">
              <source src="/images/Vidio.mp4" type="video/mp4" />
               Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default JoinWalletModal;
