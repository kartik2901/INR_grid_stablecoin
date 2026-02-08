"use client";
import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import { TopRightArrow, UpArrow } from '../../../public/icons/icons'

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className="footer_in">
                    <div className="footer_left">
                        <Link
                            href="/"
                            className='logo'
                        > <img src="/images/Main_logo.png" alt="Logo" /> <TopRightArrow /></Link>
                        <ul>
                            <li><Link href="" >Home</Link></li>
                            <li><Link href="">Blog</Link></li>
                            <li><Link href="">About Us</Link></li>
                            <li><Link href="" className='ps-0'>Team</Link></li>
                            <li><Link href="">Contacts</Link></li>
                        </ul>
                    </div>
                    <div className="footer_right">
                        <ul>
                            <li>
                                <h4>Contact Us</h4>
                                <Link href="">+91 6274750937</Link>
                            </li>
                            <li>
                                <h4>Email</h4>
                                <Link href="">info@inrstable.finance</Link>
                            </li>
                            <li>
                                <h4>Address</h4>
                                <Link href="">Dwarka,New Delhi-110078</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer_bottom">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><UpArrow /></button>
                    <div className="explore_more">
                        <h3>Explore <br />
                            our Story</h3>
                    </div>
                </div>
                <p className="copyright">
                    © {new Date().getFullYear()} — Copyright,  INRCNFT
                </p>
            </Container>
        </footer>
    )
}

export default Footer
