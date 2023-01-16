import React, { useState, useEffect } from "react";
import PageHeader from "../components/Reusable/PageHeader";
import PostHouseForSale from "../components/UserRelated/PostHouseForSale";
import PostHouseForRent from "../components/UserRelated/PostHouseForRent";
import UpdatePassword from "../components/UserRelated/UpdatePassword";
import styles from "../styles/UserDashboard.module.css";
import PostVideoAd from "../components/UserRelated/PostVideoAd";
import PostRunningAd from "../components/UserRelated/PostRunningAd";
import PostBannerAd from "../components/UserRelated/PostBannerAd";
import PostSideAd from "../components/UserRelated/PostSmallImageAd";
import AllUserPosted from "../components/UserRelated/AllUserPosted/AllUserPosted";
import PostJob from "../components/UserRelated/PostJob";
import PostVehicleForSale from "../components/UserRelated/PostVehicleForSale";
import PostVehicleForRent from "../components/UserRelated/PostVehicleForRent";
import PostService from "../components/UserRelated/PostService";

// sax optionnery stex petqa avelacnem

function UserDashboard() {
  //
  const [userExists, setUserExists] = useState(false);
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (
      !sessionStorage.getItem("user_id") ||
      !sessionStorage.getItem("access_token")
    ) {
      setUserExists(false);
    } else {
      setUserExists(true);
    }

    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-personal-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        access_token: sessionStorage.getItem("access_token"),
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else if (isMounted) {
          setUserEmail(info.userInfo[0].email);
          setUserFName(info.userInfo[0].first_name);
          setUserLName(info.userInfo[0].last_name);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const [picked, setPicked] = useState(
    "See all my listings and advertisements"
  );

  if (!userExists) {
    return null;
  }
  return (
    <div className={styles.user_dashboard_container}>
      <PageHeader
        title="User Dashboard | GorcKa.us"
        description="User Dashboard"
        content="User Dashboard - GorcKa.us"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <div className={styles.user_dashboard_container_inner_box}>
        <h4>Welcome {userFName + " " + userLName}!</h4>
        <h4>You may select below</h4>
        <select
          name="userSelection"
          id="userSelection"
          onChange={(e) => setPicked(e.target.value)}
        >
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
          <option value="Post Job Listing">Post Job Listing</option>
          <option value="Post Service">Post Service</option>
          <option value="Post House for Sale">Post House for Sale</option>
          <option value="Post House for Rent">Post House for Rent</option>
          <option value="Post Vehicle for Sale">Post Vehicle for Sale</option>
          <option value="Post Vehicle for Rent">Post Vehicle for Rent</option>
          <option value="Update Password">Update Password</option>
        </select>
      </div>
      {picked === "Update Password" ? <UpdatePassword /> : null}
      {picked === "Post Job Listing" ? <PostJob /> : null}
      {picked === "Post Service" ? <PostService /> : null}
      {picked === "Post House for Sale" ? <PostHouseForSale /> : null}
      {picked === "Post House for Rent" ? <PostHouseForRent /> : null}
      {picked === "Post Vehicle for Sale" ? <PostVehicleForSale /> : null}
      {picked === "Post Vehicle for Rent" ? <PostVehicleForRent /> : null}
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
