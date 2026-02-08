import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import business from "../../../public/images/busines.svg"
import retailers from "../../../public/images/retailers.svg"

const ForBusiness = () => {
    return (
        <section className="for_business_page">
            <Container>
                <div className="for_business_row">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h2>
                                <span>INRC for&nbsp;</span> <br />
                                Bussinesses
                            </h2>
                            <p>
                            INRC brings new opportunities for web3 businesses in acquiring the first CBDC-backed stablecoin. Interact with VDAs by using INRC without compromising stability and security. Exchanges can provide better P2P services on top of INRC to their users.                            </p>
                        </Col>
                        <Col md={6}>
                            <Image
                            src={business} alt=''
                            />
                        </Col>
                    </Row>
                </div>
                <div className="for_business_row">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <Image
                            src={retailers} alt=''
                            />
                        </Col>
                        <Col md={6}>
                            <h2 className="gradient">
                                INRC for <br />
                                Retailers
                            </h2>
                            <p>Indian Web3 users say adios to Peer-to-Peer scams & higher margins while acquiring stablecoin. Mint your stablecoin using CBDC in a secure manner.</p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default ForBusiness
