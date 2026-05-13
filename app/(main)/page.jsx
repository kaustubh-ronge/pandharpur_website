import Hero from '@/components/HeroComponents/Hero'
import React from 'react'

export const metadata = {
  title: 'Pandharpur Darshan | Complete Yatra Guide & Bookings',
  description: 'The official platform for Pandharpur Darshan. Find complete guides for Pandharpur Wari, Ashadhi Ekadashi, Vitthal Rukmini temple timings, and easily book hotels, bhaktaniwas, and travels.',
  openGraph: {
    title: 'Pandharpur Darshan | Complete Yatra Guide & Bookings',
    description: 'The official platform for Pandharpur Darshan. Find complete guides for Pandharpur Wari, Ashadhi Ekadashi, Vitthal Rukmini temple timings, and easily book hotels, bhaktaniwas, and travels.',
    url: '/',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
}

const Home = () => {
    return (
        <div>
            <Hero />
        </div>
    )
}

export default Home
