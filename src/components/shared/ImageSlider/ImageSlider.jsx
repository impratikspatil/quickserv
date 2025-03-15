import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndx, SetCurrentIndx] = useState(0);
  return (
    <div className="image_slider">
      <div
        className="image_slides"
        style={{ backgroundImage: `url(${images[currentIndx].url})` }}
      ></div>
    </div>
  );
};

export default ImageSlider;
