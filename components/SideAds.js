import React from "react";

const defaultImages = [
  {
    ad_link:
      "https://foreclosurepedia.org/wp-content/uploads/2013/12/Your-Ad-Here.jpg",
  },
  {
    ad_link:
      "https://sites.imsa.edu/acronym/files/2019/03/advertising-777x437.png",
  },
  {
    ad_link:
      "https://i.kym-cdn.com/photos/images/original/000/326/426/506.jpg",
  },
];

function SideAds({ images }) {
  return (
    <>
      {
        images.length != 0
        ?
          images.map((image, index) => {
            if (image.redirect_link) {
              return (
                <a
                  key={index}
                  href={image.redirect_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img key={index} src={image.ad_link} alt="Small Ad" />
                </a>
              );
            } else {
              return <img key={index} src={image.ad_link} alt="Small Ad" />;
            }
          })
        :

        defaultImages.map((image, index) => {
          return <img key={index} src={image.ad_link} alt="Small Ad" />;
        })
      }
    </>
  );
}

export default SideAds;

/*
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
            return <img key={image.id} src={image.ad_link} alt="Small Ad" />;
          })
          
          }
*/


/*
{images.length == 0
        ? defaultImages.map((image, index) => {
            return <img key={index} src={image.ad_link} alt="Small Ad" />;
          })
        : null}
      {images.length > 0 && images.length < 3
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
        : null}

      {images.length > 3
        ? images.map((image, index) => {
            if (image.redirect_link) {
              return (
                <a
                  key={index}
                  href={image.redirect_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img key={index} src={image.ad_link} alt="Small Ad" />
                </a>
              );
            } else {
              return <img key={index} src={image.ad_link} alt="Small Ad" />;
            }
          })
        : null}

*/
