import React from "react";
import styles from "../../../styles/UserDashboard.module.css";
// heto anem -> id-i vra ktcnen tani ed unique ejy

function DisplayPostedHousesForUser({ data, title }) {
  if (!data.length) {
    return null;
  } else {
    return (
      <div className={styles.user_dashboard_posted_houses_container}>
        <h1>{title}</h1>
        <table className={styles.user_dashboard_posted_houses_container_table}>
          <thead>
            <tr>
              <th>Listing ID</th>
              <th>Title</th>
              <th>Price</th>
              {data[0].frequency ? <th>Frequency</th> : null}
              <th>Location</th>
              <th>Name</th>
              <th>Phone</th>
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
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  {item.frequency ? <td>{item.frequency} </td> : null}
                  <td>
                    {item.city}, {item.state} {item.zip}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.is_special ? "SPECIAL" : "REGULAR"}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  {item.expires ? (
                    <td>{new Date(item.expires).toLocaleDateString()} </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayPostedHousesForUser;