import React from "react";

export default function SliderIndicators({
  slides,
  translateSlideValue,
  slidesLength,
  indicatorClickHandler,
  slidesPerView,
}) {
  const isCarouselNumFix = slides.length !== slidesLength ? 1 : 0;
  return (
    <>
      {slides.map((el, idx) =>
        idx + slidesPerView <= slidesLength ? (
          idx + isCarouselNumFix === Math.abs(translateSlideValue / 100) ? (
            <span
              key={idx}
              className="indicators active"
              onClick={indicatorClickHandler}
            ></span>
          ) : (
            <span
              key={idx}
              className="indicators"
              onClick={indicatorClickHandler}
            ></span>
          )
        ) : null
      )}
    </>
  );
}
