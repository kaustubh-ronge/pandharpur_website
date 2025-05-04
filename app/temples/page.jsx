"use client";
//import { Slot } from '@radix-ui/react-slot';

import Image from "next/image";
import { MapPin } from "lucide-react"; 
import Link from "next/link";
//import Slider from "react-slick"; // 🚨 Importing react-slick


//const sliderImages = [
  //"/images/pandharpurtemple1.jpg",
  //"/images/mandirpandharpur.jpg",
 // "/images/pandharpurtemple1.jpg",
  //"/images/ashadi-ekadashi.jpeg",
//];



const TempleList = [
  {
    title: "Shri Gajanan Maharaj Mandir",
    description:
      "Serene spiritual center dedicated to the revered saint Shri Gajanan Maharaj, attracting devotees seeking peace, blessings, and inner guidance.",
    image: "/images/pandharpurtemple1.jpg",
    location: "Bhakti Marg,Sangola Naka, Pandharpur. ",

  },
  {
    title: "Vishnupad Temple",
    description:
      "The temple is distinguished by the sacred footprints of Lord Vishnu (also associated with Lord Krishna) etched into basalt rock, symbolizing his divine presence. ",
    image: "/images/ganapathi.jpg",
    location: "Gopalpur Road, Pandharpur",

  },
  {
    title: "Yogiraj Tukarambaba Khedlekar Ashram, Pandharpur",
    description:
      "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace. ",
    image: "/images/durga.jpg",
    location: "Gursale Road,near Vitthal Petrol Pump,Pandharpur. ",

  },
  {
    title: "Sant Kaikadi Maharaj Math",
    description:
      "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace. ",
    image: "/images/durga.jpg",
    location: "16 pachimidwar,near vitthal mandir,Pandharpur",

  },
  {
    title: "Pundalik Temple",
    description:
      "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace. ",
    image: "/images/durga.jpg",
    location: "M8HQ+6Q4, Chandrabhaga River,Pandharpur",
  },
  {
    title: "Sri Sri Radha Pandharinath Mandir Pandharpur",
    description:
      "The temple is dedicated to Lord Krishna and Goddess Radha. This temple is very beautiful and situated on the bank of the holy river Chandra Bhaga. ",
    image: "/images/durga.jpg",
    location: "H74, Shegaon Dumala, Maharashtra",


  },
  {
    title: "Kaikadi Maharaj Mandir Pandharpur",
    description:
      "This is a great place to worship and doubles up as a museum. Kaikadi Maharaj Mandir in Pandharpur is a serene and spiritual place dedicated to the revered saint Kaikadi Maharaj. ",
    image: "/images/durga.jpg",
    location: "June Pat,Pandharpur,Maharashtra ",

  },
  {
    title: "Shri Sant Gajanan Maharaj Mandir Pandharpur",
    description:
      "The temple is dedicated to Gajanan Maharaj. He is one of the well-known saints of India. Devotees of Gajanan Maharaj believe that Gajanan Maharaj is an avatar of Lord Ganesha.  ",
    image: "/images/durga.jpg",
    location: "Shivaji Chowk, Pandharpur,Maharashtra.",

  },

];
export default function TemplePage() {

  //const sliderSettings = {
   // dots: true,
    //infinite: true,
    //speed: 500,
    //autoplay: true,
    //autoplaySpeed: 3000,
    //slidesToShow: 1,
    //slidesToScroll: 1,
  //};

  return (
    <div className="bg-white">
      {/* Shri Ram Mandir Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gray-50">
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Shri Vitthal Rukmini Mandir</h1>
          <h2 className="text-lg text-orange-600 font-semibold mb-3">
          Lord Vitthal appeared in Pandharpur to bless Pundalik.
          </h2>
          <p className="text-gray-700 mb-4">
          The Vitthal-Rukmini Temple, located in Pandharpur, Maharashtra, is a prominent Hindu pilgrimage site dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini. </p>
          <p className="text-gray-700 mb-4">
          Believed to have been established in the 12th century by the Hoysala king Vishnuvardhana, the temple holds deep historical and spiritual significance.
          </p>
          <button className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition duration-200">
            Discover More
          </button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/pandharpurtemple1.jpg" // Make sure to place this image in public/images/rammandir.jpg
            alt="Shri Ram Mandir"
            width={500}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        
      </section>
     

      




  {/* Temple List Section */}
  <section className="py-12 text-center">
      <h2 className="text-3xl from-orange-600 font-bold mb-2">Temples in Pandharpur</h2>

      <p className="text-gray-600 mb-8">
      Discover more iconic temples and spiritual landmarks across Pandharpur in a meaningful and immersive way.

      </p>
      <div className="flex justify-center flex-wrap gap-6">
        {TempleList.map((Temple, idx) => (
          <div
            key={idx}
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md p-4"
          >
            <Image
              src={Temple.image}
              alt={Temple.title}
              width={300}
              height={200}
              className="rounded-md mb-3 object-cover w-full h-48"
            />
            <h3 className="font-semibold  text-lg mb-1">{Temple.title}</h3>
            <p className="text-gray-600 text-sm">{Temple.description}</p>
            <div className="text-sm text-blue-600 font-medium flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              {Temple.location}
            </div>
            <button className="mt-2 inline-block text-white from-orange-600  hover:from-orange-700 px-4 py-2 text-sm rounded">
              View More
            </button>
          </div>
        ))}
      </div>
      </section>
     </div>
  );
}

