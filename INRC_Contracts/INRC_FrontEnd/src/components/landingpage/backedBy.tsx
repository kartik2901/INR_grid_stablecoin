import img from "../../../public/images/backedbyy.svg";
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const BackedBy = () => {
    return (
        <section className="backed_by_section">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <Image
                            src={img}
                            alt=""
                        />
                    </Col>
                    <Col md={6}>
                        <div className="backed_by_content">
                            <h2>Backed By Central Bank Digital Currency </h2>
                            <p>INRC maintains a stable value by pegging it directly to the Indian Central Bank Digital Currency (CBDC), acting as a bridge between volatile crypto assets and fiat currencies. Users holding e-₹ (digital rupees) in their CBDC wallets can seamlessly mint INRC using a designated smart contract. This contract ensures the 1:1 peg between INRC and e-₹ and facilitates the redemption of the stablecoin for the underlying CBDC.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default BackedBy
