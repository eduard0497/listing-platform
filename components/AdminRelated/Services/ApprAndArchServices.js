import React from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import { shortenText } from "../../UsefulFunctions/helperFunctions";

function ApprAndArchServices({ listings, approved, archived, getAll }) {
  const archive = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-archive-service`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        alert(info.msg);
      });
  };

  const deleteListing = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-delete-service`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        alert(info.msg);
      });
  };

  return (
    <div className={styles.table_outer_for_scroll}>
      {/*  */}
      {listings.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Posted</th>
              <th>Title</th>
              <th>Type</th>
              <th>Details</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Images</th>
              <th>City, State, ZIP</th>
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
                  <td>{shortenText(item.title, 50)}</td>
                  <td>{item.type}</td>
                  <td>
                    <pre>{shortenText(item.details, 50)}</pre>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
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
                  <td>
                    {item.city}, {item.state} {item.zip}
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

export default ApprAndArchServices;
