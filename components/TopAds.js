import React from "react";
import styles from "../styles/Components/TopAds.module.css";
import ReactPlayer from "react-player";
// video default linky Anushikenc caxiknery
// nkarneri defaultn el dzem
// redirect link unena avelacnem funkcian

const defaultState = {
  videoLink: "https://www.youtube.com/watch?v=HKS0BjJMKlY",
  images: [],
};

function TopAds({ video, banners }) {
  return (
    <div className={styles.top_ads_container}>
      <div className={styles.top_ads_container_video}>
        {video.length ? (
          <ReactPlayer
            url={video[0].video_link}
            controls
            muted
            width="100%"
            height="100%"
          />
        ) : (
          <ReactPlayer
            url={defaultState.videoLink}
            controls
            muted
            width="100%"
            height="100%"
          />
        )}
      </div>
      <div className={styles.top_ads_container_image_one}>
        {banners.length ? (
          <>
            {banners[0].redirect_link ? (
              <a
                href={banners[0].redirect_link}
                target="_blank"
                rel="noreferrer"
              >
                <img src={banners[0].ad_link} alt="Banner Ad" />
              </a>
            ) : (
              <img src={banners[0].ad_link} alt="Banner Ad" />
            )}
          </>
        ) : (
          // default image banner image 1
          <img src="https://sites.imsa.edu/acronym/files/2019/03/advertising-777x437.png" alt="Banner Ad" />
        )}
      </div>
      <div className={styles.top_ads_container_image_two}>
        {banners.length > 1 ? (
          <>
            {banners[1].redirect_link ? (
              <a
                href={banners[1].redirect_link}
                target="_blank"
                rel="noreferrer"
              >
                <img src={banners[1].ad_link} alt="Banner Ad" />
              </a>
            ) : (
              <img src={banners[1].ad_link} alt="Banner Ad" />
            )}
          </>
        ) : (
          // default image banner image 2
          <img src="https://sites.imsa.edu/acronym/files/2019/03/advertising-777x437.png" alt="Banner Ad" />
        )}
      </div>
    </div>
  );
}

export default TopAds;
