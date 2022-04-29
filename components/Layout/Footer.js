import React from "react";
import styles from "../../styles/Components/Layout.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.footer_container}>
      <h1>Footer</h1>
      <h1>Footer</h1>
      <div className={styles.footer_links}>
        <Link href="/prices">
          <a>prices</a>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
