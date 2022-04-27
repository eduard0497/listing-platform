import React from "react";
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
  return (
    <div className={styles.admin_links}  >
      <button style={{background: "red", fontWeight: "bold"}} onClick={logOut}>Sign Out</button>
    </div>
  );
}

export default LogOut;
