import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/AdminDashboard.module.css";

function LogOut() {
  const router = useRouter();
  const logOut = () => {
    sessionStorage.clear();
    setTimeout(async () => {
      await router.push("/");
      window.location.reload();
    }, 800);
  };

  const [accessKey, setAccessKey] = useState("");

  const resetEverything = async () => {
    if (!accessKey.length) {
      return;
    } else {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-delete-everything-from-all`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            access_key: accessKey
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.msg);
        });
    }
  };

  return (
    <div className={styles.admin_logout_links}>
      <button className={styles.admin_delete_button} onClick={logOut}>
        Sign Out
      </button>
      <div>
        <input
          type="text"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
        />
        <button className={styles.admin_delete_button} onClick={resetEverything}>!!!DO NOT CLICK!!!</button>
      </div>
    </div>
  );
}

export default LogOut;
