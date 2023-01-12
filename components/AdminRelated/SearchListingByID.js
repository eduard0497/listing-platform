import React, { useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";

function SearchListingByID() {
  const [listing, setListing] = useState([]);
  const [listingIDToSearch, setListingIDToSearch] = useState("");

  const getListing = () => {
    if (!listingIDToSearch) {
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-specific-listing-info`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          id: listingIDToSearch,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          alert(data.msg);
        } else {
          setListing(data.listing);
        }
      });
  };

  const clearSearch = () => {
    setListing([]);
    setListingIDToSearch("");
  };

  return (
    <div>
      <div className={styles.admin_links}>
        <input
          type="number"
          placeholder="Search Listing By ID"
          value={listingIDToSearch}
          onChange={(e) => setListingIDToSearch(e.target.value)}
        />
        <button className={styles.admin_update_button} onClick={getListing}>
          SEARCH
        </button>
        <button className={styles.admin_delete_button} onClick={clearSearch}>
          CLEAR
        </button>
      </div>

      {listing.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Listing ID</th>
                <th>User Added</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
              </tr>
            </thead>

            <tbody>
              {listing.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{item.user_added}</td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default SearchListingByID;
