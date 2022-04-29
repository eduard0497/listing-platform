import React from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function ApprAndArchHouses({
  listings,
  sale,
  rent,
  approved,
  archived,
  getAll,
}) {
  //
  const archive = (id) => {
    if (sale) {
      customArchive(id, "admin-archive-house-for-sale");
    } else if (rent) {
      customArchive(id, "admin-archive-house-for-rent");
    }
  };
  const deleteListing = (id) => {
    if (sale) {
      customDeleteListing(id, "admin-delete-house-for-sale");
    } else if (rent) {
      customDeleteListing(id, "admin-delete-house-for-rent");
    }
  };
  const customArchive = (listingID, endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: listingID,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        console.log(info.msg);
      });
  };
  const customDeleteListing = (listingID, endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: listingID,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        console.log(info.msg);
      });
  };
  //

  return (
    <div className={styles.table_outer_for_scroll}>
      {/*  */}
      {listings.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Posted</th>
              <th>Type</th>
              <th>Title</th>
              <th>Beds</th>
              <th>Baths</th>
              <th>Total Area</th>
              <th>Price</th>
              <th>Details</th>
              <th>Address</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Images</th>
              <th>Expires</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => {
              return (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{item.user_posted}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.beds}</td>
                  <td>{item.baths}</td>
                  <td>{item.total_area}</td>
                  <td>${item.price}</td>
                  <td>
                    <pre>{item.details}</pre>
                  </td>
                  <td>
                    {item.city}, {item.state} {item.zip}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>
                    {item.images.map((image, index) => {
                      return (
                        <a key={index} href={image}>
                          Image{"\n"}
                        </a>
                      );
                    })}
                  </td>
                  <td>{new Date(item.expires).toLocaleDateString()}</td>
                  {approved && (
                    <td>
                      <button
                        value={item.id}
                        className={styles.admin_delete_button}
                        onClick={(e) => archive(e.target.value)}
                      >
                        ARCHIVE
                      </button>
                    </td>
                  )}
                  {archived && (
                    <td>
                      <button
                        value={item.id}
                        className={styles.admin_delete_button}
                        onClick={(e) => deleteListing(e.target.value)}
                      >
                        DELETE
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}

      {/*  */}
    </div>
  );
}

export default ApprAndArchHouses;
