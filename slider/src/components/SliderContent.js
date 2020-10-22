import React, { useState, useRef, useEffect } from "react";
import SliderIndicators from "./SliderIndicators";
/*
import "@fortawesome/fontawesome-free";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; //uncomment there and on buttons if u want to use font-awesome icons
*/
export default function SliderContent({ slides, settings, slidesLength }) {
  const isDuplicateNeeded = useRef(settings.infiniteLoop || false);
  const isIndicatorsNeeded = settings?.indicators || false;
  const [translateSlideValue, getNewTranslateSlideValue] = useState(
    isDuplicateNeeded.current ? -100 : 0
  );
  const slidesPerView = settings?.slidesPerView || 1;
  const [render, getRender] = useState(false);
  const touchPositionMove = useRef(0);
  const touchPositionStart = useRef(0);
  const isTransitionEnd = useRef(0);
  useEffect(() => {
    if (isDuplicateNeeded.current) {
      slides.splice(0, 0, slides[slides.length - 1]);
      slides.push(slides[1]);
      getRender(true);
    }
  }, [slides]);

  const [transitionType, getNewTransitionType] = useState(
    "all 0.5s ease-in-out"
  );

  const previousSlide = () => {
    if (Math.abs(translateSlideValue) !== 0) {
      getNewTransitionType("all 0.5s ease-in-out");
      getNewTranslateSlideValue(translateSlideValue + 100);
    }
    setTimeout(() => (isTransitionEnd.current = 0), 100);
  };
  const touchMove = (e) => {
    if (e.type === "touchmove" && isTransitionEnd.current < 1) {
      isTransitionEnd.current = 1;
      if (touchPositionStart.current - e.touches[0].pageX > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
      touchPositionMove.current = e.touches[0].pageX;
    }
  };

  const touchStart = (e) => {
    touchPositionStart.current = e.touches[0].pageX;
  };
  const mouseUp = (e) => {
    touchPositionMove.current = e.pageX;
    if (touchPositionStart.current - e.pageX === 0) return false;
    if (touchPositionStart.current - e.pageX > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };
  const mouseDown = (e) => {
    touchPositionStart.current = e.pageX;
  };
  const nextSlide = () => {
    setTimeout(() => (isTransitionEnd.current = 0), 100);
    if (Math.abs(translateSlideValue) <= (slides.length - 2) * 100) {
      getNewTransitionType("all 0.5s ease-in-out");
      getNewTranslateSlideValue(translateSlideValue - 100);
    }
  };
  const transitionEND = () => {
    if (
      Math.abs(translateSlideValue) >=
      (slides.length - slidesPerView) * 100
    ) {
      getNewTransitionType("none");
      isDuplicateNeeded.current
        ? getNewTranslateSlideValue(-100 + 100 * (slidesPerView - 1))
        : getNewTranslateSlideValue(translateSlideValue);
    } else if (translateSlideValue === 0) {
      getNewTransitionType("none");
      isDuplicateNeeded.current
        ? getNewTranslateSlideValue((slides.length - 2) * -100)
        : getNewTranslateSlideValue(translateSlideValue);
    }
  };
  const indicatorClickHandler = (e) => {
    const index = Array.from(document.querySelectorAll(".indicators")).indexOf(
      e.target
    );
    getNewTransitionType("all 0.5s ease-in-out");
    isDuplicateNeeded.current
      ? getNewTranslateSlideValue((index + 1) * -100)
      : getNewTranslateSlideValue(index * -100);
  };
  return (
    <div
      className="slider"
      style={{
        width: settings?.width || "100%",
        height: settings?.height || "100%",
      }}
      defaultValue={render} //just to hide the warning
    >
      <div
        className="slider-btn-container"
        style={{
          width: settings?.width || "100%",
          height: settings?.height || "100%",
        }}
      >
        <button className="slider-arrow-left" onClick={previousSlide}>
          {
            //<FaChevronLeft />
          }
          &lt;
        </button>
        <button className="slider-arrow-right" onClick={nextSlide}>
          {
            //<FaChevronRight />
          }
          &gt;
        </button>
      </div>
      <div
        className="slides"
        style={{
          transform: `translateX(${translateSlideValue / slidesPerView}%)`,
          transition: `${transitionType}`,
          width: settings?.width || "100%",
          height: settings?.height || "100%",
        }}
        onTransitionEnd={transitionEND}
        onTouchMove={touchMove}
        onTouchStart={touchStart}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {slides.map((el, idx) => (
          <div
            key={idx}
            className="slide"
            style={{
              minWidth:
                `${parseFloat(settings?.width) / slidesPerView}%` || "100%",
              height: settings?.height || "100%",
            }}
          >
            {el}
          </div>
        ))}
      </div>
      {isIndicatorsNeeded ? (
        <div
          className="indicators-wrapper"
          style={{
            width: settings?.width || "100%",
            bottom: `${Math.abs(parseFloat(settings?.height) - 100)}` || "0%",
          }}
        >
          {
            <SliderIndicators
              slides={slides}
              translateSlideValue={translateSlideValue}
              slidesLength={slidesLength}
              indicatorClickHandler={indicatorClickHandler}
              slidesPerView={slidesPerView}
            />
          }
        </div>
      ) : null}
    </div>
  );
}
