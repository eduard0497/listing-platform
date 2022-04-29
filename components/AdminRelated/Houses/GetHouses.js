import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import ApprAndArchHouses from "./ApprAndArchHouses";
import PendingHouseSaleRentComp from "./PendingHouseSaleRentComp";

function GetHouses() {
  const [allPendingHousesForSale, setPendingHousesForSale] = useState([]);
  const [allApprovedHousesForSale, setAllApprovedHousesForSale] = useState([]);
  const [allArchivedHousesForSale, setAllArchivedHousesForSale] = useState([]);
  const [allPendingHousesForRent, setPendingHousesForRent] = useState([]);
  const [allApprovedHousesForRent, setAllApprovedHousesForRent] = useState([]);
  const [allArchivedHousesForRent, setAllArchivedHousesForRent] = useState([]);

  const [showPendingForSale, setShowPendingForSale] = useState(false);
  const [showPendingForRent, setShowPendingForRent] = useState(false);
  const [showApprovedForSale, setShowApprovedForSale] = useState(false);
  const [showApprovedForRent, setShowApprovedForRent] = useState(false);
  const [showArchivedForSale, setShowArchivedForSale] = useState(false);
  const [showArchivedForRent, setShowArchivedForRent] = useState(false);

  const [userIdOrListingID, setUserIdOrListingID] = useState("");

  const getAll = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-houses`, {
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
          setPendingHousesForSale(data.pendingHousesForSale);
          setPendingHousesForRent(data.pendingHousesForRent);
          setAllApprovedHousesForSale(data.approvedHousesForSale);
          setAllApprovedHousesForRent(data.approvedHousesForRent);
          setAllArchivedHousesForSale(data.archivedHousesForSale);
          setAllArchivedHousesForRent(data.archivedHousesForRent);
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
        Pending Sale | {allPendingHousesForSale.length}
      </button>
      {showPendingForSale &&
        allPendingHousesForSale.map((item) => {
          return (
            <PendingHouseSaleRentComp
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
        Pending Rent | {allPendingHousesForRent.length}
      </button>
      {showPendingForRent &&
        allPendingHousesForRent.map((item) => {
          return (
            <PendingHouseSaleRentComp
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
        Approved Sale | {allApprovedHousesForSale.length}
      </button>
      {showApprovedForSale && (
        <ApprAndArchHouses
          listings={filterAll(allApprovedHousesForSale)}
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
        Archived Sale | {allArchivedHousesForSale.length}
      </button>
      {showArchivedForSale && (
        <ApprAndArchHouses
          listings={filterAll(allArchivedHousesForSale)}
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
        Approved Rent | {allApprovedHousesForRent.length}
      </button>
      {showApprovedForRent && (
        <ApprAndArchHouses
          listings={filterAll(allApprovedHousesForRent)}
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
        Archived Rent | {allArchivedHousesForRent.length}
      </button>
      {showArchivedForRent && (
        <ApprAndArchHouses
          listings={filterAll(allArchivedHousesForRent)}
          rent={true}
          archived={true}
          getAll={getAll}
        />
      )}
    </div>
  );
}

export default GetHouses;
