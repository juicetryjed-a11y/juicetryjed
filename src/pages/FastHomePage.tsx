import React from 'react'
import SimpleHeader from '@/components/layout/SimpleHeader'
import Footer from '@/components/layout/Footer'
import FastHero from '@/components/sections/FastHero'
import FastProducts from '@/components/sections/FastProducts'


const FastHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader />
      <main className="pt-20">
        <FastHero />
        <FastProducts />
      </main>
      <Footer />
    </div>
  )
}

export default FastHomePage
