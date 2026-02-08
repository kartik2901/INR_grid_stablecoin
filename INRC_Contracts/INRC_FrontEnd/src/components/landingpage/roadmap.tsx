"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider, { Settings } from 'react-slick'
import { InfraIcon, IntergrationIcon, KYCUsersIcon, LitepaperIcon, RoadmapLeft, RoadmapRight, SmartContractIcon, TeamBuildingIcon, WebsiteIcon } from '../../../public/icons/icons';

const PrevArrow = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button onClick={props.onClick} className={`slick-arrow prev-arrow ${props.className?.includes("disabled") ? "disabled" : ""}`}>
            <RoadmapLeft />
        </button>
    )
}
const NextArrow = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button onClick={props.onClick} className={`slick-arrow next-arrow ${props.className?.includes("disabled") ? "disabled" : ""}`}>
            <RoadmapRight />
        </button>
    )
}

const Roadmap = () => {
    const settings: Settings = {
        dots: false,
        infinite: false,
        centerMode: false,
        slidesToShow: 9,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    }
    return (
        <section className="roadmap_section">
            <Container>
                <h2>Roadmap</h2>
                {/* {
                    Array.from({ length: 4 }).map((_item, index) => {
                        return (
                            <Col key={index} md={3}>
                                <div className="roadmap_box">
                                    <h3>Feature {index + 1}</h3>
                                </div>
                            </Col>
                        )
                    })
                } */}
                <Slider {...settings}>
                    <div className="roadmap_box_title">
                        <h3>Q1</h3>
                    </div>
                    <div className="up">
                        <WebsiteIcon />
                        <h4>Q1 Website</h4>
                    </div>
                    <div className="down">
                        <LitepaperIcon />
                        <h4>Q1 Litepaper</h4>
                    </div>
                    <div className="up">
                        <SmartContractIcon />
                        <h4>Q1 Smart Contract </h4>
                    </div>
                    <div className="roadmap_box_title">
                        <h3>Q2</h3>
                    </div>
                    <div className="up">
                        <WebsiteIcon />
                        <h4>Website</h4>
                    </div>
                    <div className="down">
                        <LitepaperIcon />
                        <h4>Litepaper</h4>
                    </div>
                    <div className="up">
                        <SmartContractIcon />
                        <h4>Smart Contract </h4>
                    </div>
                    <div className="down">
                        <TeamBuildingIcon />
                        <h4>Team building</h4>
                    </div>
                    <div className="roadmap_box_title">
                        <h3>Q3</h3>
                    </div>
                    <div className="up">
                        <InfraIcon />
                        <h4>Infra</h4>
                    </div>
                    <div className="down">
                        <KYCUsersIcon />
                        <h4>KYC for Users</h4>
                    </div>
                    <div className="up">
                        <IntergrationIcon />
                        <h4>CBDC integration</h4>
                    </div>
                </Slider>
            </Container>
        </section>
    )
}

export default Roadmap
