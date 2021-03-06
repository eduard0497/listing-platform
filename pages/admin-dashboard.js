import React, { useState, useEffect } from "react";
import styles from "../styles/AdminDashboard.module.css";
import LogOut from "../components/AdminRelated/LogOut";
import GetAllUsers from "../components/AdminRelated/Users/GetAllUsers";
import GetAllPrices from "../components/AdminRelated/GetAllPrices";
import GetAllJobCategories from "../components/AdminRelated/GetAllJobCategories";
import GetHouses from "../components/AdminRelated/Houses/GetHouses";
import GetVehicles from "../components/AdminRelated/Vehicles/GetVehicles";
import GetAds from "../components/AdminRelated/Ads/GetAds";
import SearchUserByID from "../components/AdminRelated/Users/SearchUserByID";
import GetAllHouseTypes from "../components/AdminRelated/GetAllHouseTypes";
import GetJobs from "../components/AdminRelated/Jobs/GetJobs";

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
      <div className={styles.admin_links}>
        <button onClick={(e) => setWhatToShow("")}>CLEAR</button>
        <button onClick={(e) => setWhatToShow("all users")}>All Users</button>
        <button onClick={(e) => setWhatToShow("all prices")}>All Prices</button>
        <button onClick={(e) => setWhatToShow("all job categories")}>
          All Job Categories
        </button>
        <button onClick={(e) => setWhatToShow("all house types")}>
          All House Types
        </button>
        <button onClick={(e) => setWhatToShow("all ads")}>All Ads</button>
        <button onClick={(e) => setWhatToShow("all jobs")}>All Jobs</button>
        <button onClick={(e) => setWhatToShow("all houses")}>All Houses</button>
        <button onClick={(e) => setWhatToShow("all vehicles")}>
          All Vehicles
        </button>
      </div>
      <div className={styles.admin_dashboard_content}>
        {whatToShow === "all users" ? <GetAllUsers /> : null}
        {whatToShow === "all prices" ? <GetAllPrices /> : null}
        {whatToShow === "all job categories" ? <GetAllJobCategories /> : null}
        {whatToShow === "all house types" ? <GetAllHouseTypes /> : null}
        {whatToShow === "all ads" ? <GetAds /> : null}
        {whatToShow === "all jobs" ? <GetJobs /> : null}
        {whatToShow === "all houses" ? <GetHouses /> : null}
        {whatToShow === "all vehicles" ? <GetVehicles /> : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
