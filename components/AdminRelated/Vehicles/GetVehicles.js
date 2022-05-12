import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import ApprAndArchVehicles from "./ApprAndArchVehicles";
import PendingVehicleSaleRentComp from "./PendingVehicleSaleRentComp";

function GetVehicles() {
  const [allPendingVehiclesForSale, setPendingVehiclesForSale] = useState([]);
  const [allApprovedVehiclesForSale, setAllApprovedVehiclesForSale] = useState(
    []
  );
  const [allArchivedVehiclesForSale, setAllArchivedVehiclesForSale] = useState(
    []
  );
  const [allPendingVehiclesForRent, setPendingVehiclesForRent] = useState([]);
  const [allApprovedVehiclesForRent, setAllApprovedVehiclesForRent] = useState(
    []
  );
  const [allArchivedVehiclesForRent, setAllArchivedVehiclesForRent] = useState(
    []
  );

  const [showPendingForSale, setShowPendingForSale] = useState(false);
  const [showPendingForRent, setShowPendingForRent] = useState(false);
  const [showApprovedForSale, setShowApprovedForSale] = useState(false);
  const [showApprovedForRent, setShowApprovedForRent] = useState(false);
  const [showArchivedForSale, setShowArchivedForSale] = useState(false);
  const [showArchivedForRent, setShowArchivedForRent] = useState(false);

  const [userIdOrListingID, setUserIdOrListingID] = useState("");

  const getAll = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-vehicles`, {
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
          setPendingVehiclesForSale(data.pendingVehiclesForSale);
          setPendingVehiclesForRent(data.pendingVehiclesForRent);
          setAllApprovedVehiclesForSale(data.approvedVehiclesForSale);
          setAllApprovedVehiclesForRent(data.approvedVehiclesForRent);
          setAllArchivedVehiclesForSale(data.archivedVehiclesForSale);
          setAllArchivedVehiclesForRent(data.archivedVehiclesForRent);
        }
      });
  };

  const foldAll = () => {
    setShowPendingForSale(false);
    setShowPendingForRent(false);
    setShowApprovedForSale(false);
    setShowApprovedForRent(false);
    setShowArchivedForSale(false);
    setShowArchivedForRent(false);
  };
  const unfoldAll = () => {
    setShowPendingForSale(true);
    setShowPendingForRent(true);
    setShowApprovedForSale(true);
    setShowApprovedForRent(true);
    setShowArchivedForSale(true);
    setShowArchivedForRent(true);
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

      {/*  */}

      <button
        onClick={() => setShowPendingForSale(!showPendingForSale)}
        style={buttonStyle}
      >
        Pending Sale | {allPendingVehiclesForSale.length}
      </button>
      {showPendingForSale &&
        allPendingVehiclesForSale.map((item) => {
          return (
            <PendingVehicleSaleRentComp
              key={item.id}
              listing={item}
              sale={true}
              getAll={getAll}
            />
          );
        })}
      {/*  */}
      <button
        onClick={() => setShowPendingForRent(!showPendingForRent)}
        style={buttonStyle}
      >
        Pending Rent | {allPendingVehiclesForRent.length}
      </button>
      {showPendingForRent &&
        allPendingVehiclesForRent.map((item) => {
          return (
            <PendingVehicleSaleRentComp
              key={item.id}
              listing={item}
              rent={true}
              getAll={getAll}
            />
          );
        })}
      <h3>----------------------------------------------</h3>
      {/*  */}

      <button
        onClick={() => setShowApprovedForSale(!showApprovedForSale)}
        style={buttonStyle}
      >
        Approved Sale | {allApprovedVehiclesForSale.length}
      </button>
      {showApprovedForSale && (
        <ApprAndArchVehicles
          listings={filterAll(allApprovedVehiclesForSale)}
          sale={true}
          approved={true}
          getAll={getAll}
        />
      )}
      {/*  */}
      <button
        onClick={() => setShowArchivedForSale(!showArchivedForSale)}
        style={buttonStyle}
      >
        Archived Sale | {allArchivedVehiclesForSale.length}
      </button>
      {showArchivedForSale && (
        <ApprAndArchVehicles
          listings={filterAll(allArchivedVehiclesForSale)}
          sale={true}
          archived={true}
          getAll={getAll}
        />
      )}
      {/*  */}
      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowApprovedForRent(!showApprovedForRent)}
        style={buttonStyle}
      >
        Approved Rent | {allApprovedVehiclesForRent.length}
      </button>
      {showApprovedForRent && (
        <ApprAndArchVehicles
          listings={filterAll(allApprovedVehiclesForRent)}
          rent={true}
          approved={true}
          getAll={getAll}
        />
      )}
      {/*  */}
      <button
        onClick={() => setShowArchivedForRent(!showArchivedForRent)}
        style={buttonStyle}
      >
        Archived Rent | {allArchivedVehiclesForRent.length}
      </button>
      {showArchivedForRent && (
        <ApprAndArchVehicles
          listings={filterAll(allArchivedVehiclesForRent)}
          rent={true}
          archived={true}
          getAll={getAll}
        />
      )}
    </div>
  );
}

export default GetVehicles;
