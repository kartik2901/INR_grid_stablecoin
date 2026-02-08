"use client"; 
import Link from "next/link";
import { useState } from "react";
import { Container } from "react-bootstrap"
import JoinWalletModal from "./JoinWalletModal";

const LandingHeader = () => {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <header className="landing_header">
                <Container>
                    <div className="header_in">
                        <Link className="logo" href={"/"}>
                        <img src="/images/Main_logo.png" alt="Logo" />
                        </Link>
                        <div className="menu_list">
                            <li>FAQ</li>
                            <li>About</li>
                            <li>Launch App</li>
                            <li><button onClick={handleShowModal}>Join Waitlist</button></li>
                        </div>
                    </div>
                </Container>
            </header>
            <JoinWalletModal show={showModal} handleClose={handleCloseModal} />
        </>
    )
}

export default LandingHeader