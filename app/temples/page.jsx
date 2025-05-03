//temple page hero section 

import Image from 'next/image';

export default function TempleSection() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/Pandharpur.jpeg" // Make sure this image exists in /public/images/
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Optional dark overlay for better text visibility */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start justify-center h-full px-6 md:px-20 py-10">
        {/* Hero Text */}
        <div className="max-w-2xl mt-20">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Let’s Make <br />
            Your Best Trip Ever
          </h2>
          <p className="mt-4 text-lg text-white/80">
            The best travel for your journey respectful of the environment
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-10 w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
          {/* Trip Type Tabs */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              One Way
            </button>
            <button className="text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              Round Trip
            </button>
            <button className="text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              Multi - City
            </button>
          </div>

          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">From</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-md text-black">
                <option>Indonesia</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">To</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-md text-black">
                <option>South Korea</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Expected Date</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-md text-black">
                <option>June 2023</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md transition">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
