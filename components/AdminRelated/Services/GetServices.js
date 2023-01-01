import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import ApprAndArchServices from "./ApprAndArchServices";
import PendingServices from "./PendingServices";

function GetServices() {
  const [allPendingServices, setAllPendingServices] = useState([]);
  const [allApprovedServices, setAllApprovedServices] = useState([]);
  const [allArchivedServices, setAllArchivedServices] = useState([]);

  const [showPendingServices, setShowPendingServices] = useState(false);
  const [showApprovedServices, setShowApprovedServices] = useState(false);
  const [showArchivedServices, setShowArchivedServices] = useState(false);

  const [userIdOrListingID, setUserIdOrListingID] = useState("");

  const getAll = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-services`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else {
          setAllPendingServices(data.pendingServices);
          setAllApprovedServices(data.approvedServices);
          setAllArchivedServices(data.archivedServices);
        }
      });
  };

  const foldAll = () => {
    setShowPendingServices(false);
    setShowApprovedServices(false);
    setShowArchivedServices(false);
  };
  const unfoldAll = () => {
    setShowPendingServices(true);
    setShowApprovedServices(true);
    setShowArchivedServices(true);
  };

  const buttonStyle = {
    padding: "5px",
  };

  const filterAll = (array) => {
    if (userIdOrListingID) {
      return array.filter(
        (item) =>
          item.user_posted == userIdOrListingID || item.id == userIdOrListingID
      );
    } else {
      return array;
    }
  };

  return (
    <div className={styles.admin_pending_container}>
      <div className={styles.admin_links}>
        <button onClick={getAll}>GET All</button>
        <button onClick={foldAll}>FOLD ALL</button>
        <button onClick={unfoldAll}>UNFOLD ALL</button>
        <input
          type="text"
          placeholder="Type User ID or Listing ID..."
          onChange={(e) => setUserIdOrListingID(e.target.value)}
        />
      </div>

      <button
        onClick={() => setShowPendingServices(!showPendingServices)}
        style={buttonStyle}
      >
        Pending Services | {allPendingServices.length}
      </button>
      {showPendingServices &&
        allPendingServices.map((item) => {
          return (
            <PendingServices key={item.id} listing={item} getAll={getAll} />
          );
        })}

      <h3>----------------------------------------------</h3>
      <button
        onClick={() => setShowApprovedServices(!showApprovedServices)}
        style={buttonStyle}
      >
        Approved Services | {allApprovedServices.length}
      </button>
      {showApprovedServices && (
        <ApprAndArchServices
          listings={filterAll(allApprovedServices)}
          approved={true}
          getAll={getAll}
        />
      )}

      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowArchivedServices(!showArchivedServices)}
        style={buttonStyle}
      >
        Archived Services | {allArchivedServices.length}
      </button>
      {showArchivedServices && (
        <ApprAndArchServices
          listings={filterAll(allArchivedServices)}
          archived={true}
          getAll={getAll}
        />
      )}
    </div>
  );
}

export default GetServices;
