import React from "react";

export default function SliderIndicators({
  slides,
  translateSlideValue,
  slidesLength,
  indicatorClickHandler,
  slidesPerView,
}) {
  const isCarouselNumFix = slides.length !== slidesLength ? 1 : 0;
  const slidesClassNames = slides.map((el, idx) =>
    idx + slidesPerView <= slidesLength
      ? idx + isCarouselNumFix === Math.abs(translateSlideValue / 100)
        ? "indicators active"
        : "indicators"
      : null
  );
  return (
    <>
      {slidesClassNames.map((el, idx) => (
        <span key={idx} className={el} onClick={indicatorClickHandler}></span>
      ))}
    </>
  );
}
