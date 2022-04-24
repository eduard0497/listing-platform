import React from "react";
import styles from "../../../styles/UserDashboard.module.css";

function DisplayPostedRunningAdsForUser({ data, title }) {
  if (!data.length) {
    return null;
  } else {
    return (
      <div
        className={styles.user_dashboard_container_display_running_ad_container}
      >
        <h1>{title}</h1>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className={
                styles.user_dashboard_container_display_running_ad_container_ad
              }
            >
              <h3>{item.text}</h3>
              {item.expires ? (
                <h4>Expires: {new Date(item.expires).toLocaleDateString()}</h4>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayPostedRunningAdsForUser;
