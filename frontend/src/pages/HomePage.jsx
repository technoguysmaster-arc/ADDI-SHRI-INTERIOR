import { Helmet } from 'react-helmet-async'
import HeroSlider from '../components/home/HeroSlider'
import WhyChooseUs from '../components/home/WhyChooseUs'
import FeaturedProjects from '../components/home/FeaturedProjects'
import PriceCalculator from '../components/home/PriceCalculator'
import DesignIdeas from '../components/home/DesignIdeas'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>AADI SHRI INTERIOR — Complete Interior & Exterior Solutions</title>
        <meta name="description" content="Transform your home with AADI SHRI INTERIOR. Premium interior and exterior design solutions tailored to your dream. Get a free consultation today." />
        <meta property="og:title" content="AADI SHRI INTERIOR — Complete Interior & Exterior Solutions" />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSlider />
      <WhyChooseUs />
      <FeaturedProjects />
      <PriceCalculator />
      <DesignIdeas />
      <Testimonials />
      <CTABanner />
    </>
  )
}
