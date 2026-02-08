import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import exchange from "../../../public/images/exchange.svg"
import market from "../../../public/images/market-maker.svg"
import web3 from "../../../public/images/web3-plateform.svg"
import Image from 'next/image'

const WhyChoose = () => {
    return (
        <section className='why_choose_section'>
            <Container>
                <div className="why_choose_in">
                    <h2><span>Why</span> Businesses Chose INRC ?</h2>
                    <p>Making Decentralised Finance (DeFi) easy to access for Indian businesses and users.</p>
                    <Row>
                        <Col md={4}>
                            <div className="why_choose_in_box">
                                <Image
                                src={exchange}
                                alt=""
                                />
                                <h3>Exchanges</h3>
                                <p>INRC enables seamless conversion and empowers over one billion digital payment-friendly Indians through trading pairs on both decentralised and centralised exchanges.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="why_choose_in_box">
                                <Image
                                src={market}
                                alt=""
                                />
                                <h3>Market Makers</h3>
                                <p>INRC stablecoin provides opportunities across various platforms, including centralised virtual digital assets exchanges, NFT marketplaces, real-world asset tokenization, and decentralised exchanges.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="why_choose_in_box">
                                <Image
                                src={web3}
                                alt=""
                                />
                                <h3>Web3 Platforms</h3>
                                <p>INRC payment gateway integration facilitates hassle-free on-chain transactions and instant web3 trade settlements.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default WhyChoose
