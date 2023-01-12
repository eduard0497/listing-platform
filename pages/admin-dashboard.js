import React, { useState, useEffect } from "react";
import styles from "../styles/AdminDashboard.module.css";
import LogOut from "../components/AdminRelated/LogOut";
import GetAllUsers from "../components/AdminRelated/Users/GetAllUsers";
import GetHouses from "../components/AdminRelated/Houses/GetHouses";
import GetVehicles from "../components/AdminRelated/Vehicles/GetVehicles";
import GetAds from "../components/AdminRelated/Ads/GetAds";
import SearchUserByID from "../components/AdminRelated/Users/SearchUserByID";
import SearchListingByID from "../components/AdminRelated/SearchListingByID";
import GetJobs from "../components/AdminRelated/Jobs/GetJobs";
import GetServices from "../components/AdminRelated/Services/GetServices";

function AdminDashboard() {
  const [whatToShow, setWhatToShow] = useState("");
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    if (
      !sessionStorage.getItem("admin_id") ||
      !sessionStorage.getItem("access_token")
    ) {
      setAdminExists(false);
    } else {
      setAdminExists(true);
    }
  }, []);

  if (!adminExists) {
    return null;
  }

  return (
    <div className={styles.admin_dashboard}>
      <LogOut />
      <SearchUserByID />
      <SearchListingByID />
      <div className={styles.admin_links}>
        <button className={styles.admin_delete_button} onClick={(e) => setWhatToShow("")}>CLEAR</button>
        <button className={styles.admin_update_button} onClick={(e) => setWhatToShow("all users")}>All Users</button>
        <button className={styles.admin_update_button} onClick={(e) => setWhatToShow("all ads")}>All Ads</button>
        <button className={styles.admin_update_button} onClick={(e) => setWhatToShow("all jobs")}>All Jobs</button>
        <button className={styles.admin_update_button} onClick={(e) => setWhatToShow("all services")}>
          All Services
        </button>
        <button className={styles.admin_update_button} onClick={(e) => setWhatToShow("all houses")}>All Houses</button>
        <button className={styles.admin_update_button} onClick={(e) => setWhatToShow("all vehicles")}>
          All Vehicles
        </button>
      </div>
      <div className={styles.admin_dashboard_content}>
        {whatToShow === "all users" ? <GetAllUsers /> : null}
        {whatToShow === "all ads" ? <GetAds /> : null}
        {whatToShow === "all jobs" ? <GetJobs /> : null}
        {whatToShow === "all services" ? <GetServices /> : null}
        {whatToShow === "all houses" ? <GetHouses /> : null}
        {whatToShow === "all vehicles" ? <GetVehicles /> : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
