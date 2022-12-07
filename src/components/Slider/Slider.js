import React, { useState } from "react";
import { ArrowLeft } from "../../atoms/Arrow/ArrowLeft";
import { ArrowRight } from "../../atoms/Arrow/ArrowRight";

export const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="slider">
      <div onClick={goPrevious} className="go-left">
        <ArrowLeft />
      </div>
      <div onClick={goNext} className="go-right">
        <ArrowRight />
      </div>
      <img src={slides[currentIndex]} />
    </div>
  );
};
