import React, { useState, useEffect } from "react";
import Popup from "../../Reusable/Popup";
import DisplayPostedAdsForUser from "./DisplayPostedAdsForUser";
import DisplayPostedRunningAdsForUser from "./DisplayPostedRunningAdsForUser";
import styles from "../../../styles/UserDashboard.module.css";
import styles_loading from "../../../styles/Components/Layout.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import DisplayPostedHousesForUser from "./DisplayPostedHousesForUser";

// sra mej senc kanem
// amen mi variable-y map kanem
// u henc asenq individual listingneri ejy patrast klini
// stexic linqov ktani ed individual ej
// arden user-y ira qcacy ktena

function AllUserPosted() {
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);
  const [loading, setLoading] = useState(false);
  // variables
  const [bannerAdsPosted, setBannerAdsPosted] = useState([]);
  const [bannerAdsPending, setBannerAdsPending] = useState([]);
  const [runningAdsPosted, setRunningAdsPosted] = useState([]);
  const [runningAdsPending, setRunningAdsPending] = useState([]);
  const [sideAdsPosted, setSideAdsPosted] = useState([]);
  const [sideAdsPending, setSideAdsPending] = useState([]);
  const [videoAdsPosted, setVideoAdsPosted] = useState([]);
  const [videoAdsPending, setVideoAdsPending] = useState([]);
  //
  const [postedHousesForSale, setPostedHousesForSale] = useState([]);
  const [pendingHousesForSale, setPendingHousesForSale] = useState([]);
  const [postedHousesForRent, setPostedHousesForRent] = useState([]);
  const [pendingHousesForRent, setPendingHousesForRent] = useState([]);
  //

  useEffect(async () => {
    setLoading(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-all-added-ads`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          access_token: sessionStorage.getItem("access_token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          setInfoForUser(data.msg);
          setShowInfoForUser(true);
        } else {
          setBannerAdsPosted(data.bannerAdsPosted);
          setBannerAdsPending(data.bannerAdsPending);
          setRunningAdsPosted(data.runningAdsPosted);
          setRunningAdsPending(data.runningAdsPending);
          setSideAdsPosted(data.sideAdsPosted);
          setSideAdsPending(data.sideAdsPending);
          setVideoAdsPosted(data.videoAdsPosted);
          setVideoAdsPending(data.videoAdsPending);
        }
      });
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-all-posted-or-pending-houses`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          access_token: sessionStorage.getItem("access_token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          setInfoForUser(data.msg);
          setShowInfoForUser(true);
        } else {
          setPostedHousesForSale(data.postedHousesForSale);
          setPendingHousesForSale(data.pendingHousesForSale);
          setPostedHousesForRent(data.postedHousesForRent);
          setPendingHousesForRent(data.pendingHousesForRent);
        }
      });
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles_loading.layout_loading}>
          <PropagateLoader
            color={process.env.NEXT_PUBLIC_CLIP_LOADER_COLOR}
            loading={loading}
            size={20}
          />
        </div>
      ) : (
        <div className={styles.user_dashboard_container_display_posted}>
          <Popup
            infoForUser={infoForUser}
            showInfoForUser={showInfoForUser}
            setShowInfoForUser={setShowInfoForUser}
          />

          <DisplayPostedAdsForUser
            data={bannerAdsPosted}
            title="Live Banner Ads"
          />
          <DisplayPostedAdsForUser
            data={bannerAdsPending}
            title="Pending Banner Ads"
          />
          <DisplayPostedAdsForUser data={sideAdsPosted} title="Live Side Ads" />
          <DisplayPostedAdsForUser
            data={sideAdsPending}
            title="Pending Side Ads"
          />
          <DisplayPostedAdsForUser
            data={videoAdsPosted}
            title="Live Video Ads"
          />
          <DisplayPostedAdsForUser
            data={videoAdsPending}
            title="Pending Video Ads"
          />

          <DisplayPostedRunningAdsForUser
            data={runningAdsPosted}
            title="Live Running Ad"
          />
          <DisplayPostedRunningAdsForUser
            data={runningAdsPending}
            title="Pending Running Ads"
          />
          <div>
            <DisplayPostedHousesForUser
              data={postedHousesForSale}
              title="Posted Houses For Sale"
            />
            <DisplayPostedHousesForUser
              data={pendingHousesForSale}
              title="Pending Houses For Sale"
            />
            <DisplayPostedHousesForUser
              data={postedHousesForRent}
              title="Posted Houses For Sale"
            />
            <DisplayPostedHousesForUser
              data={pendingHousesForRent}
              title="Pending Houses For Rent"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AllUserPosted;
