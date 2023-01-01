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
          console.log(data.msg);
        } else {
          setListing(data.listing);
        }
      });
  };

  const clearSearch = () => {
    setListing([]);
  };

  const [stripeSessionIDToAdd, setStripeSessionIDToAdd] = useState("");

  const updateListingToAddStripeSessionID = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-stripe-session-id`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          //
          id: listing[0].id,
          stripe_session_id: stripeSessionIDToAdd,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        getListing();
        console.log(info.msg);
      });
  };

  return (
    <div>
      <div className={styles.admin_links}>
        <input
          type="text"
          placeholder="Search Listing By ID and Update"
          onChange={(e) => setListingIDToSearch(e.target.value)}
        />
        <button onClick={getListing}>SEARCH</button>
        <button onClick={clearSearch}>CLEAR</button>
      </div>

      {listing.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Listing ID</th>
                <th>User Added</th>
                <th>Stripe Session</th>
                <th>Update Button</th>
              </tr>
            </thead>

            <tbody>
              {listing.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{item.user_added}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Stripe Session ID"
                      defaultValue={item.stripe_session_id}
                      onChange={(e) => setStripeSessionIDToAdd(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={updateListingToAddStripeSessionID}>
                      Update
                    </button>
                  </td>
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
