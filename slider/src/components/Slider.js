import SliderContent from "./SliderContent";
import React from "react";

export default function Slider({ children, settings }) {
  const slides = Array.from(children);
  return (
    <SliderContent
      slides={slides}
      settings={settings}
      slidesLength={slides.length}
    />
  );
}
