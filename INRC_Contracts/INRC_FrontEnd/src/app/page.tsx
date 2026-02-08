import Footer from '@/components/footer/footer'
import LandingHeader from '@/components/landingHeader/landingHeader'
import BackedBy from '@/components/landingpage/backedBy'
import Banner from '@/components/landingpage/banner'
import Faq from '@/components/landingpage/faq'
import ForBusiness from '@/components/landingpage/forBusiness'
import Roadmap from '@/components/landingpage/roadmap'
import WhyChoose from '@/components/landingpage/whyChoose'
import React from 'react'

const page = () => {
    return (
        <>
            <LandingHeader />
            <Banner />
            <BackedBy />
            <WhyChoose />
            <ForBusiness />
            <Roadmap />
            <Faq />
            <Footer />
        </>
    )
}

export default page
