"use client";
import React from 'react'
import { Accordion, Container } from 'react-bootstrap'
import { RightArrow } from '../../../public/icons/icons'

const Faq = () => {
    return (
        <section className='faq_section'>
            <Container>
                <h2>
                    FAQ
                    <span><RightArrow /></span>
                </h2>
                <div className="accordions">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>What is INRC Crypto Currency?</Accordion.Header>
                            <Accordion.Body>
                                Crypto ipsum bitcoin ethereum dogecoin litecoin. Dash compound avalanche polymath solana kadena kava tether. Ipsum telcoin hedera loopring bitcoin chainlink solana PancakeSwap klaytn. Telcoin tezos dogecoin IOTA polkadot IOTA tether bitcoin compound. Decentraland fantom decentraland arweave waves decred aave.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What are the benefits of using INRC?</Accordion.Header>
                            <Accordion.Body>
                                Crypto ipsum bitcoin ethereum dogecoin litecoin. Dash compound avalanche polymath solana kadena kava tether. Ipsum telcoin hedera loopring bitcoin chainlink solana PancakeSwap klaytn. Telcoin tezos dogecoin IOTA polkadot IOTA tether bitcoin compound. Decentraland fantom decentraland arweave waves decred aave.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>How can I buy INRC?</Accordion.Header>
                            <Accordion.Body>                            Crypto ipsum bitcoin ethereum dogecoin litecoin. Dash compound avalanche polymath solana kadena kava tether. Ipsum telcoin hedera loopring bitcoin chainlink solana PancakeSwap klaytn. Telcoin tezos dogecoin IOTA polkadot IOTA tether bitcoin compound. Decentraland fantom decentraland arweave waves decred aave.

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>What blockchain platform does INRC use?</Accordion.Header>
                            <Accordion.Body>
                                Crypto ipsum bitcoin ethereum dogecoin litecoin. Dash compound avalanche polymath solana kadena kava tether. Ipsum telcoin hedera loopring bitcoin chainlink solana PancakeSwap klaytn. Telcoin tezos dogecoin IOTA polkadot IOTA tether bitcoin compound. Decentraland fantom decentraland arweave waves decred aave.

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Container>
        </section>
    )
}

export default Faq
