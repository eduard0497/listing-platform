import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function GetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  const [emailToSearch, setEmailToSearch] = useState("");

  const getAllUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-users`, {
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
          setAllUsers(data.allUsers);
        }
      });
  };

  const banUser = async (e) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-ban-user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        user_id: e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllUsers();
        alert(data.msg);
      });
  };

  const deleteUser = async (e) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-delete-user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        user_id: e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllUsers();
        alert(data.msg);
      });
  };

  const generalFilter = (text) => {
    return allUsers.filter(
      (item) =>
        item.email.toLowerCase().includes(text.toLowerCase()) ||
        item.first_name.toLowerCase().includes(text.toLowerCase()) ||
        item.last_name.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <div>
      <div className={styles.admin_links}>
        <button onClick={getAllUsers} className={styles.admin_approve_button}>
          Refresh | Users: {allUsers.length}
        </button>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setEmailToSearch(e.target.value)}
        />
      </div>

      <div className={styles.table_outer_for_scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Email Active</th>
              <th>Date Registered</th>
              <th>DELETE USER</th>
              <th>BAN USER</th>
            </tr>
          </thead>
          <tbody>
            {generalFilter(emailToSearch).map((user) => (
              <tr key={user.user_id} className={styles.table_rows}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.is_email_active ? "Active" : "Inactive"}</td>
                <td>{new Date(user.timestamp).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={deleteUser}
                    value={user.user_id}
                    className={styles.admin_delete_button}
                  >
                    DELETE THE USER
                  </button>
                </td>
                <td>
                  {user.is_banned ? (
                    "BANNED!!!"
                  ) : (
                    <button
                      onClick={banUser}
                      value={user.user_id}
                      className={styles.admin_delete_button}
                    >
                      BAN THE USER
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAllUsers;
