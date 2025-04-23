"use client"
import React, { useEffect, useRef } from 'react'


const HeroSection = () => {

    // const imageRef = useRef(null);
    // useEffect(() => {
    //     const imageElement = imageRef.current;
    //     const handleScroll = () => {

    //         const scrollPosition = window.scrollY;
    //         const scrollThreshold = 100;
    //         if (scrollPosition > scrollThreshold) {
    //             imageElement.classList.add("scrolled")
    //         }
    //         else{
    //             imageElement.classList.remove("scrolled")
    //         }
    //     }
    //     window.addEventListener("scroll", handleScroll);
    //     return ()=> window.removeEventListener("scroll", handleScroll)
    // }, [])

    return (
      <div className='pt-10 mt-15'>Hero Section</div>
    )
}

export default HeroSection
