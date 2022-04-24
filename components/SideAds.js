import React from "react";

const defaultImages = [
  {
    id: 1,
    ad_link: "https://via.placeholder.com/300x500",
  },
  {
    id: 2,
    ad_link: "https://via.placeholder.com/500x200",
  },
  {
    id: 3,
    ad_link: "https://via.placeholder.com/400",
  },
];
function SideAds({ images }) {
  return (
    <>
      {images.length != 0
        ? images.map((image) => {
            if (image.redirect_link) {
              return (
                <a
                  key={image.id}
                  href={image.redirect_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img key={image.id} src={image.ad_link} alt="Small Ad" />
                </a>
              );
            } else {
              return <img key={image.id} src={image.ad_link} alt="Small Ad" />;
            }
          })
        : defaultImages.map((image) => {
            if (image.redirect_link) {
              return (
                <a
                  key={image.id}
                  href={image.redirect_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img key={image.id} src={image.ad_link} alt="Small Ad" />
                </a>
              );
            } else {
              return <img key={image.id} src={image.ad_link} alt="Small Ad" />;
            }
          })}
    </>
  );
}

export default SideAds;
