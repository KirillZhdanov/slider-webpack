import React from "react";

export default function SliderArrows({ settings, previousSlide, nextSlide }) {
  return (
    <div
      className="slider-btn-container"
      style={{
        width: settings?.width || "100%",
        height: settings?.height || "100%",
      }}
    >
      <button className="slider-arrow-left slider-btn" onClick={previousSlide}>
        &lt;
      </button>
      <button className="slider-arrow-right slider-btn" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
}
