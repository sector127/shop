// import React, { useState } from "react";
// import { ArrowLeft } from "../../atoms/Arrow/ArrowLeft";
// import { ArrowRight } from "../../atoms/Arrow/ArrowRight";

// export const Slider = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const goPrevious = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };
//   const goNext = () => {
//     const isLastSlide = currentIndex === slides.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className="slider">
//       <div onClick={goPrevious} className="go-left">
//         <ArrowLeft />
//       </div>
//       <div onClick={goNext} className="go-right">
//         <ArrowRight />
//       </div>
//       <img src={slides[currentIndex]} alt="" />
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "../../atoms/Arrow/ArrowLeft";
import { ArrowRight } from "../../atoms/Arrow/ArrowRight";

export const Slider = ({ slides, autoplayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goPrevious = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let intervalId;

    if (!isModalOpen) {
      intervalId = setInterval(goNext, autoplayInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, isModalOpen, autoplayInterval]);

  return (
    <div className="slider">
      <div onClick={goPrevious} className="go-left">
        <ArrowLeft />
      </div>
      <div onClick={goNext} className="go-right">
        <ArrowRight />
      </div>
      <img
        src={slides[currentIndex]}
        alt=""
        onClick={openModal}
        className="slide-image"
      />

      <div className="indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <img src={slides[currentIndex]} alt="" />
            <button onClick={goPrevious} className="modal-button previous">
              &lt; Previous
            </button>
            <button onClick={goNext} className="modal-button next">
              Next &gt;
            </button>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
