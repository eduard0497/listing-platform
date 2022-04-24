import React, { useState } from "react";
import PostHouseForSale from "../components/UserRelated/PostHouseForSale";
import PostHouseForRent from "../components/UserRelated/PostHouseForRent";
import UpdatePassword from "../components/UserRelated/UpdatePassword";
import styles from "../styles/UserDashboard.module.css";
import PostVideoAd from "../components/UserRelated/PostVideoAd";
import PostRunningAd from "../components/UserRelated/PostRunningAd";
import PostBannerAd from "../components/UserRelated/PostBannerAd";
import PostSideAd from "../components/UserRelated/PostSmallImageAd";
import AllUserPosted from "../components/UserRelated/AllUserPosted/AllUserPosted";
// sax optionnery stex petqa avelacnem

function UserDashboard() {
  const [picked, setPicked] = useState("");
  return (
    <div className={styles.user_dashboard_container}>
      <div className={styles.user_dashboard_container_inner_box}>
        <h2>I want to...</h2>
        <select
          name="userSelection"
          id="userSelection"
          onChange={(e) => setPicked(e.target.value)}
        >
          <option value=""></option>

          <option value="Update Password">Update Password</option>
          <option value="See all my listings and advertisements">
            See all my listings and advertisements
          </option>
          <option value="Post Video Advertisement">
            Post Video Advertisement
          </option>
          <option value="Post Top Banner Advertisement">
            Post Top Banner Advertisement
          </option>
          <option value="Post Small Image Advertisement">
            Post Small Image Advertisement
          </option>
          <option value="Post Running Sentence Advertisement">
            Post Running Sentence Advertisement
          </option>

          <option value="Post House for Sale">Post House for Sale</option>
          <option value="Post House for Rent">Post House for Rent</option>
        </select>
      </div>
      {picked === "Update Password" ? <UpdatePassword /> : null}
      {picked === "Post House for Sale" ? <PostHouseForSale /> : null}
      {picked === "Post House for Rent" ? <PostHouseForRent /> : null}
      {picked === "Post Video Advertisement" ? <PostVideoAd /> : null}
      {picked === "Post Running Sentence Advertisement" ? (
        <PostRunningAd />
      ) : null}
      {picked === "Post Top Banner Advertisement" ? <PostBannerAd /> : null}
      {picked === "Post Small Image Advertisement" ? <PostSideAd /> : null}
      {picked === "See all my listings and advertisements" ? (
        <AllUserPosted />
      ) : null}
    </div>
  );
}

export default UserDashboard;