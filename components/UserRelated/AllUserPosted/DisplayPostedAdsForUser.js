import React from "react";
import styles from "../../../styles/UserDashboard.module.css";
import ReactPlayer from "react-player";

function DisplayPostedAdsForUser({ data, title }) {
  if (!data.length) {
    return null;
  } else if (title === "Live Video Ads" || title === "Pending Video Ads") {
    return (
      <div
        className={styles.user_dashboard_container_display_posted_ads_container}
      >
        <h1>{title}</h1>
        <div
          className={
            styles.user_dashboard_container_display_posted_ads_container_cards
          }
        >
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  styles.user_dashboard_container_display_posted_ads_container_cards_card
                }
              >
                <div>
                  <ReactPlayer
                    url={item.video_link}
                    controls
                    muted
                    width="100%"
                    height="100%"
                  />
                </div>

                <h4>Ad Id: {item.id}</h4>
                {item.expires ? (
                  <h4>
                    Expires: {new Date(item.expires).toLocaleDateString()}
                  </h4>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.user_dashboard_container_display_posted_ads_container}
      >
        <h1>{title}</h1>

        <div
          className={
            styles.user_dashboard_container_display_posted_ads_container_cards
          }
        >
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  styles.user_dashboard_container_display_posted_ads_container_cards_card
                }
              >
                <div>
                  <img src={item.ad_link} alt="user posted image" />
                </div>

                <h4>Ad Id: {item.id}</h4>
                <h4>Redirect Link: {item.redirect_link}</h4>
                {item.expires ? (
                  <h4>
                    Expires: {new Date(item.expires).toLocaleDateString()}
                  </h4>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DisplayPostedAdsForUser;
