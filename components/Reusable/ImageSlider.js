import React, { useState } from "react";
import styles from "../../styles/Components/DisplayListings.module.css";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

function ImageSlider({ images, displayCarousel }) {
  const [current, setCurrent] = useState(0);
  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const previousImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const changeImageFromCarousel = (e) => {
    setCurrent(parseInt(e.target.id));
  };

  if (!images) {
    return <img src="/logo/gorcka_logo.jpeg" alt="default" />;
  } else {
    return (
      <>
        <MdArrowBackIos
          onClick={previousImage}
          className={styles.button_left}
        />
        <MdArrowForwardIos
          onClick={nextImage}
          className={styles.button_right}
        />

        <img src={images[current]} alt="current_image" />
        {displayCarousel ? (
          <div className={styles.image_carousel}>
            {images.map((item, index) => (
              <img
                src={item}
                alt="carousel_images"
                key={index}
                id={index}
                onClick={(e) => changeImageFromCarousel(e)}
              />
            ))}
          </div>
        ) : null}
      </>
    );
  }
}

export default ImageSlider;
