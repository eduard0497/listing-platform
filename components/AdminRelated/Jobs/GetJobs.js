import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import ApprAndArchJobs from "./ApprAndArchJobs";
import PendingJobs from "./PendingJobs";

function GetJobs() {
  const [allPendingJobs, setAllPendingJobs] = useState([]);
  const [allApprovedJobs, setAllApprovedJobs] = useState([]);
  const [allArchivedJobs, setAllArchivedJobs] = useState([]);

  const [showPendingJobs, setShowPendingJobs] = useState(false);
  const [showApprovedJobs, setShowApprovedJobs] = useState(false);
  const [showArchivedJobs, setShowArchivedJobs] = useState(false);

  const [userIdOrListingID, setUserIdOrListingID] = useState("");

  const getAll = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-jobs`, {
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
          alert(data.msg);
        } else {
          setAllPendingJobs(data.pendingJobs);
          setAllApprovedJobs(data.approvedJobs);
          setAllArchivedJobs(data.archivedJobs);
        }
      });
  };

  const foldAll = () => {
    setShowPendingJobs(false);
    setShowApprovedJobs(false);
    setShowArchivedJobs(false);
  };
  const unfoldAll = () => {
    setShowPendingJobs(true);
    setShowApprovedJobs(true);
    setShowArchivedJobs(true);
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
      <button onClick={getAll}  className={styles.admin_approve_button}>GET All</button>
        <button onClick={foldAll}  className={styles.admin_ready_button}>FOLD</button>
        <button onClick={unfoldAll}  className={styles.admin_ready_button}>UNFOLD</button>
        <input
          type="text"
          placeholder="Type User ID or Listing ID..."
          onChange={(e) => setUserIdOrListingID(e.target.value)}
        />
      </div>

      <button
        onClick={() => setShowPendingJobs(!showPendingJobs)}
        style={buttonStyle}
      >
        Pending Jobs | {allPendingJobs.length}
      </button>
      {showPendingJobs &&
        allPendingJobs.map((item) => {
          return <PendingJobs key={item.id} listing={item} getAll={getAll} />;
        })}

      <h3>----------------------------------------------------------------------------------</h3>
      <button
        onClick={() => setShowApprovedJobs(!showApprovedJobs)}
        style={buttonStyle}
      >
        Approved Jobs | {allApprovedJobs.length}
      </button>
      {showApprovedJobs && (
        <ApprAndArchJobs
          listings={filterAll(allApprovedJobs)}
          approved={true}
          getAll={getAll}
        />
      )}

      <h3>----------------------------------------------------------------------------------</h3>

      <button
        onClick={() => setShowArchivedJobs(!showArchivedJobs)}
        style={buttonStyle}
      >
        Archived Jobs | {allArchivedJobs.length}
      </button>
      {showArchivedJobs && (
        <ApprAndArchJobs
          listings={filterAll(allArchivedJobs)}
          archived={true}
          getAll={getAll}
        />
      )}
    </div>
  );
}

export default GetJobs;
