import React, { useState, useEffect } from "react";
import Popup from "../../Reusable/Popup";
import DisplayPostedAdsForUser from "./DisplayPostedAdsForUser";
import DisplayPostedRunningAdsForUser from "./DisplayPostedRunningAdsForUser";
import styles from "../../../styles/UserDashboard.module.css";
import styles_loading from "../../../styles/Components/Layout.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  _propagate_loader_color,
  _propagate_loader_size,
} from "../../UsefulFunctions/globalVariables";
import DisplayPostedHousesForUser from "./DisplayPostedHousesForUser";
import DisplayPostedJobsForUser from "./DisplayPostedJobsForUser";
import DisplayPostedVehiclesForUser from "./DisplayPostedVehiclesForUser";
import DisplayPostedServicesForUser from "./DisplayPostedServicesForUser";

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
  const [jobsPosted, setJobsPosted] = useState([]);
  const [jobsPending, setJobsPending] = useState([]);
  //
  const [servicesPosted, setServicesPosted] = useState([]);
  const [servicesPending, setServicesPending] = useState([]);
  //
  const [postedHousesForSale, setPostedHousesForSale] = useState([]);
  const [pendingHousesForSale, setPendingHousesForSale] = useState([]);
  const [postedHousesForRent, setPostedHousesForRent] = useState([]);
  const [pendingHousesForRent, setPendingHousesForRent] = useState([]);
  //
  const [postedVehiclesForSale, setPostedVehiclesForSale] = useState([]);
  const [pendingVehiclesForSale, setPendingVehiclesForSale] = useState([]);
  const [postedVehiclesForRent, setPostedVehiclesForRent] = useState([]);
  const [pendingVehiclesForRent, setPendingVehiclesForRent] = useState([]);
  //

  useEffect(async () => {
    setLoading(true);
    //
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-all-paid-listing-ids`,
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
          sessionStorage.setItem(
            "paid_listings",
            JSON.stringify(data.allReturnedPaidIDs)
          );
        }
      });
    //
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

    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-all-posted-or-pending-vehicles`,
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
          setPostedVehiclesForSale(data.postedVehiclesForSale);
          setPendingVehiclesForSale(data.pendingVehiclesForSale);
          setPostedVehiclesForRent(data.postedVehiclesForRent);
          setPendingVehiclesForRent(data.pendingVehiclesForRent);
        }
      });

    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-all-added-jobs`,
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
          setJobsPending(data.userPostedPendingJobs);
          setJobsPosted(data.userPostedApprovedJobs);
        }
      });

    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-get-all-posted-or-pending-services`,
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
          setServicesPending(data.pendingServices);
          setServicesPosted(data.postedServices);
        }
      });
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles_loading.layout_loading}>
          <PropagateLoader
            color={_propagate_loader_color}
            loading={loading}
            size={_propagate_loader_size}
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
            data={bannerAdsPending}
            title="Pending Banner Ads"
          />
          <DisplayPostedAdsForUser
            data={sideAdsPending}
            title="Pending Side Ads"
          />
          <DisplayPostedAdsForUser
            data={videoAdsPending}
            title="Pending Video Ads"
          />
          <DisplayPostedRunningAdsForUser
            data={runningAdsPending}
            title="Pending Running Ads"
          />
          <DisplayPostedHousesForUser
            data={pendingHousesForSale}
            title="Pending Houses For Sale"
          />
          <DisplayPostedHousesForUser
            data={pendingHousesForRent}
            title="Pending Houses For Rent"
          />
          <DisplayPostedVehiclesForUser
            data={pendingVehiclesForSale}
            title="Pending Vehicles For Sale"
          />
          <DisplayPostedVehiclesForUser
            data={pendingVehiclesForRent}
            title="Pending Vehicles For Rent"
          />
          <DisplayPostedJobsForUser data={jobsPending} title="Pending Jobs" />
          <DisplayPostedServicesForUser
            data={servicesPending}
            title="Pending Services"
          />

          {/* --------------------------------------------- */}

          <DisplayPostedAdsForUser
            data={bannerAdsPosted}
            title="Live Banner Ads"
          />
          <DisplayPostedAdsForUser data={sideAdsPosted} title="Live Side Ads" />
          <DisplayPostedAdsForUser
            data={videoAdsPosted}
            title="Live Video Ads"
          />
          <DisplayPostedRunningAdsForUser
            data={runningAdsPosted}
            title="Live Running Ad"
          />
          <DisplayPostedHousesForUser
            data={postedHousesForSale}
            canRedirect={true}
            sale={true}
            rent={false}
            title="Posted Houses For Sale"
          />
          <DisplayPostedHousesForUser
            data={postedHousesForRent}
            canRedirect={true}
            sale={false}
            rent={true}
            title="Posted Houses For Rent"
          />
          <DisplayPostedVehiclesForUser
            data={postedVehiclesForSale}
            canRedirect={true}
            sale={true}
            rent={false}
            title="Posted Vehicles For Sale"
          />
          <DisplayPostedVehiclesForUser
            data={postedVehiclesForRent}
            canRedirect={true}
            sale={false}
            rent={true}
            title="Posted Vehicles For Rent"
          />
          <DisplayPostedJobsForUser
            data={jobsPosted}
            canRedirect={true}
            title="Posted Jobs"
          />
          <DisplayPostedServicesForUser
            data={servicesPosted}
            canRedirect={true}
            title="Posted Services"
          />
        </div>
      )}
    </>
  );
}

export default AllUserPosted;
