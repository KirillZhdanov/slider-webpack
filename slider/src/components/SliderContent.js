import React, { useState, useRef, useEffect } from "react";
import SliderIndicators from "./SliderIndicators";
import SliderArrows from "./SliderArrows";

export default function SliderContent({ slides, settings, slidesLength }) {
  const isDuplicateNeeded = useRef(settings.infiniteLoop || false);
  const isMouseDown = useRef(false);
  const index = useRef(0);
  const prevMove = useRef(0);
  const isIndicatorsNeeded = settings?.indicators || false;
  const [translateSlideValue, setNewTranslateSlideValue] = useState(
    isDuplicateNeeded.current ? -100 : 0
  );
  const slidesPerView = settings?.slidesPerView || 1;
  const [render, setRender] = useState(false);
  const touchPositionMove = useRef(0);
  const touchPositionStart = useRef(0);
  const touchPositionEnd = useRef(0);
  const isTransitionEnd = useRef(0);
  useEffect(() => {
    if (isDuplicateNeeded.current) {
      slides.splice(0, 0, slides[slides.length - 1]);
      slides.push(slides[1]);
      setRender(true);
    }
  }, [slides]);

  const [transitionType, setNewTransitionType] = useState("all 1s ease-in-out");

  const previousSlide = () => {
    if (Math.abs(translateSlideValue) !== 0) {
      setNewTransitionType("all 1s ease-in-out");
      setNewTranslateSlideValue(translateSlideValue + 100);
    }
    setTimeout(() => (isTransitionEnd.current = 0), 100);
  };
  const touchMove = (e) => {
    if (e.type === "touchmove" && isTransitionEnd.current < 1) {
      isTransitionEnd.current = 1;
      if (touchPositionStart.current - e.touches[0].pageX > 0) {
        if (
          Math.abs(translateSlideValue) <= (slides.length - 1) * 100 &&
          index.current + 1 >= Math.abs(translateSlideValue) / 100
        ) {
          setNewTransitionType("all 1s ease-in-out");

          setNewTranslateSlideValue(
            Math.floor(
              translateSlideValue +
                Math.abs(prevMove.current) -
                ((touchPositionStart.current - e.touches[0].pageX) /
                  e.target.clientWidth) *
                  100
            )
          );
        }
      } else {
        if (index.current <= Math.abs(translateSlideValue) / 100 + 1) {
          setNewTransitionType("all 1s ease-in-out");
          setNewTranslateSlideValue(
            Math.ceil(
              translateSlideValue -
                Math.abs(prevMove.current) +
                Math.abs(
                  (touchPositionStart.current - e.touches[0].pageX) /
                    e.target.clientWidth
                ) *
                  100
            )
          );
        }
      }
      isTransitionEnd.current = 0;
      touchPositionMove.current = e.touches[0].pageX;
      prevMove.current =
        ((touchPositionStart.current - e.touches[0].pageX) /
          e.target.clientWidth) *
        100;
    }
  };
  const touchEnd = (e) => {
    touchPositionEnd.current = e.changedTouches[0].pageX;
    prevMove.current = 0;
    console.log(
      Math.round(translateSlideValue / 100) * 100,
      touchPositionStart.current,
      touchPositionEnd.current
    );
    if (
      Math.abs(touchPositionStart.current - touchPositionEnd.current) < 100 &&
      Math.abs(touchPositionStart.current - touchPositionEnd.current) > 0
    ) {
      if (touchPositionStart.current > touchPositionEnd.current)
        setNewTranslateSlideValue(
          Math.abs(Math.round(translateSlideValue / 100 - 1)) * -100
        );
      else
        setNewTranslateSlideValue(
          Math.floor(translateSlideValue / 100 + 1) * 100
        );
    } else
      setNewTranslateSlideValue(Math.round(translateSlideValue / 100) * 100);
  };
  const touchStart = (e) => {
    index.current = Math.abs(translateSlideValue / 100);
    touchPositionStart.current = e.touches[0].pageX;
  };
  const mouseUp = (e) => {
    isMouseDown.current = false;
    touchPositionMove.current = e.pageX;
    if (touchPositionStart.current - e.pageX === 0) return false;
    if (touchPositionStart.current - e.pageX > 0) {
      setTimeout(() => (isTransitionEnd.current = 0), 100);
      if (Math.abs(translateSlideValue) <= (slides.length - 2) * 100) {
        setNewTransitionType("all 1s ease-in-out");
        setNewTranslateSlideValue(translateSlideValue - 100);
      }
    } else {
      if (Math.abs(translateSlideValue) !== 0) {
        setNewTransitionType("all 1s ease-in-out");
        setNewTranslateSlideValue(translateSlideValue + 100);
      }
      setTimeout(() => (isTransitionEnd.current = 0), 100);
    }
  };
  const mouseMove = (e) => {
    if (isMouseDown.current) {
      console.log("MOVE: ", e.pageX, touchPositionStart.current, e);
    }
  };
  const mouseDown = (e) => {
    isMouseDown.current = true;
    touchPositionStart.current = e.pageX;
  };
  const nextSlide = () => {
    setTimeout(() => (isTransitionEnd.current = 0), 100);
    if (Math.abs(translateSlideValue) <= (slides.length - 2) * 100) {
      setNewTransitionType("all 1s ease-in-out");
      setNewTranslateSlideValue(translateSlideValue - 100);
    }
  };
  const transitionEND = () => {
    if (
      Math.abs(translateSlideValue) >=
      (slides.length - slidesPerView) * 100
    ) {
      setNewTransitionType("none");
      if (isDuplicateNeeded.current)
        setNewTranslateSlideValue(-100 + 100 * (slidesPerView - 1));
      else setNewTranslateSlideValue(translateSlideValue);
    } else if (translateSlideValue === 0) {
      setNewTransitionType("none");
      if (isDuplicateNeeded.current)
        setNewTranslateSlideValue((slides.length - 2) * -100);
      else setNewTranslateSlideValue(translateSlideValue);
    }
  };
  const indicatorClickHandler = (e) => {
    const index = Array.from(document.querySelectorAll(".indicators")).indexOf(
      e.target
    );
    setNewTransitionType("all 1s ease-in-out");
    if (isDuplicateNeeded.current)
      setNewTranslateSlideValue((index + 1) * -100);
    else setNewTranslateSlideValue(index * -100);
  };
  let indicators = null;
  if (isIndicatorsNeeded) {
    indicators = (
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
    );
  }

  return (
    <div
      className="slider"
      style={{
        width: settings?.width || "100%",
        height: settings?.height || "100%",
      }}
      defaultValue={render} //just to hide the warning
    >
      <SliderArrows
        settings={settings}
        previousSlide={previousSlide}
        nextSlide={nextSlide}
      />
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
        onTouchEnd={touchEnd}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
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
      {
        indicators //indicators-wrapper conditionally rendered
      }
    </div>
  );
}
