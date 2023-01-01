import React from "react";
import styles from "../../../styles/UserDashboard.module.css";
import { shortenText } from "../../UsefulFunctions/helperFunctions";
import UserPayButton from "../../Reusable/UserPayButton";
import { allPrices } from "../../UsefulFunctions/prices";

function DisplayPostedServicesForUser({ data, title }) {
  if (!data.length) {
    return null;
  } else {
    return (
      <div className={styles.user_dashboard_table_container}>
        <h1>{title}</h1>

        <div className={styles.user_dashboard_table_container_table_outer}>
          <table className={styles.user_dashboard_table_container_table}>
            <thead>
              <tr>
                <th>Listing ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Details</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City, State ZIP</th>
                <th>Listing Type</th>
                <th>Date Posted</th>
                {data[0].expires ? <th>Expires</th> : null}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{shortenText(item.title, 50)}</td>
                    <td>{item.type}</td>
                    <td>{shortenText(item.details, 20)}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      {item.city}, {item.state} {item.zip}
                    </td>
                    <td>{item.is_special ? "SPECIAL" : "REGULAR"}</td>
                    <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                    {item.expires ? (
                      <td>{new Date(item.expires).toLocaleDateString()} </td>
                    ) : null}
                    {item.is_special ? (
                      <td>
                        <UserPayButton
                          status={item.status}
                          listingID={item.id}
                          stripeLink={allPrices[4].stripe_link}
                        />
                      </td>
                    ) : (
                      <td>
                        <UserPayButton
                          status={item.status}
                          listingID={item.id}
                          stripeLink={allPrices[5].stripe_link}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DisplayPostedServicesForUser;
