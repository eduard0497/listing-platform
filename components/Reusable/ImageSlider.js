import React, { useState } from "react";
import styles from "../../styles/Components/DisplayListings.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// FaArrowRight
// FaArrowLeft

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const previousImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <>
      <FaArrowLeft onClick={previousImage} className={styles.button_left} />
      <FaArrowRight onClick={nextImage} className={styles.button_right} />

      <img src={images[current]} alt="Special" />
    </>
  );
}

export default ImageSlider;
