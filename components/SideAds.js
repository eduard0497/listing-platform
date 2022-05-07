import React from "react";

const defaultImages = [
  {
    id: 1,
    ad_link: "https://sites.imsa.edu/acronym/files/2019/03/advertising-777x437.png",
  },
  {
    id: 2,
    ad_link: "https://sites.imsa.edu/acronym/files/2019/03/advertising-777x437.png",
  },
  {
    id: 3,
    ad_link: "https://sites.imsa.edu/acronym/files/2019/03/advertising-777x437.png",
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
