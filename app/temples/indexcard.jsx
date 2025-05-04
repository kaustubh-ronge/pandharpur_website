{/* Slider Section */}
<div className="md:w-1/2 w-full">
<Slider {...sliderSettings}>
  {sliderImages.map((imgSrc, idx) => (
    <div key={idx}>
      <Image
        src={imgSrc}
        alt={`Temple Slide ${idx + 1}`}
        width={500}
        height={400}
        className="rounded-lg shadow-md object-cover"
      />
    </div>
  ))}
</Slider>
</div>