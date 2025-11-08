import React from 'react'
import HeaderNew from '@/components/layout/HeaderNew'
import Footer from '@/components/layout/Footer'
import JuicetryHero from '@/components/sections/JuicetryHero'
import JuicetryProducts from '@/components/sections/JuicetryProducts'
import JuicetryCategories from '@/components/sections/JuicetryCategories'
import CustomerReviewsSection from '@/components/sections/CustomerReviewsSection'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNew />
      <main>
        <JuicetryHero />
        <JuicetryProducts />
        <JuicetryCategories />
        <CustomerReviewsSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage