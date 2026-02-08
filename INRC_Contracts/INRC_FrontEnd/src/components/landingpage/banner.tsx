import React from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import { DiscordIcon, GithubIcon, TwitterIcon } from '../../../public/icons/icons'

const Banner = () => {
    return (
        <section className="banner">
            <Container>
                <div className="banner_in">
                    <div className="banner_content">
                        <h1>
                            Introducing <br /> Crypto.
                        </h1>
                        <p><span>INRC</span> First CBDC Backed Stablecoin Fully Compliant and Built in India</p>
                    </div>
                    {/* <button>Join Waitlist</button> */}
                    <ul>
                        <li><Link href={""} rel="noreferrer" target="_blank"><GithubIcon /></Link></li>
                        <li><Link href={""} rel="noreferrer" target="_blank"><TwitterIcon /></Link></li>
                        <li><Link href={""} rel="noreferrer" target="_blank"><DiscordIcon /></Link></li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default Banner
