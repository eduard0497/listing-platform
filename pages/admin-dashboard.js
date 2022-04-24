import React, { useState } from "react";
import styles from "../styles/AdminDashboard.module.css";
import LogOut from "../components/AdminRelated/LogOut";
import GetAllUsers from "../components/AdminRelated/GetAllUsers";
import GetAllPrices from "../components/AdminRelated/GetAllPrices";
import GetAllJobCategories from "../components/AdminRelated/GetAllJobCategories";
import GetHouses from "../components/AdminRelated/Houses/GetHouses";
import GetAds from "../components/AdminRelated/Ads/GetAds";

function AdminDashboard() {
  const [whatToShow, setWhatToShow] = useState("aaa");

  return (
    <div className={styles.admin_dashboard}>
      <LogOut />
      <div className={styles.admin_links}>
        <button onClick={(e) => setWhatToShow("")}>CLEAR</button>
        <button onClick={(e) => setWhatToShow("all users")}>All Users</button>
        <button onClick={(e) => setWhatToShow("all prices")}>All Prices</button>
        <button onClick={(e) => setWhatToShow("all job categories")}>
          All Job Categories
        </button>
        <button onClick={(e) => setWhatToShow("all ads")}>All Ads</button>
        <button onClick={(e) => setWhatToShow("all houses")}>All Houses</button>
      </div>
      <div className={styles.admin_dashboard_content}>
        {whatToShow === "all users" ? <GetAllUsers /> : null}
        {whatToShow === "all prices" ? <GetAllPrices /> : null}
        {whatToShow === "all job categories" ? <GetAllJobCategories /> : null}
        {whatToShow === "all ads" ? <GetAds /> : null}
        {whatToShow === "all houses" ? <GetHouses /> : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
