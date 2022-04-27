import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function SearchUserByID() {
  const [user, setUser] = useState([]);
  const [userIDToSearch, setUserIDToSearch] = useState("");

  const getUser = () => {
    if (!userIDToSearch) {
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-specific-user`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        userID: userIDToSearch,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else {
          setUser(data.user);
        }
      });
  };

  const clearSearch = () => {
    setUser([]);
  };

  return (
    <div>
      <div className={styles.admin_links}>
        <input
          type="text"
          placeholder="Search User By ID"
          onChange={(e) => setUserIDToSearch(e.target.value)}
        />
        <button onClick={getUser}>SEARCH</button>
        <button onClick={clearSearch}>CLEAR</button>
      </div>

      {user.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Banned</th>
              </tr>
            </thead>

            <tbody>
              {user.map((item) => (
                <tr key={item.user_id} className={styles.table_rows}>
                  <td>{item.user_id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.is_banned ? "BANNED!!!" : "Not Banned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default SearchUserByID;
