import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 text-gray-500 text-center py-10 rounded-lg">
        No images available
      </div>
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-md">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition duration-500"
      />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow"
        aria-label="Previous Image"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow"
        aria-label="Next Image"
      >
        <FaChevronRight />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
