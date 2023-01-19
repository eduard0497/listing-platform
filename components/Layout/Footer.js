import React from "react";
import styles from "../../styles/Components/Layout.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.footer_container}>
      <h3>© 2022 Eduard H.</h3>
      <div className={styles.navbar_sublinks_container}>
      <Link href="/privacy-policy">
          <a>privacy policy</a>
        </Link>
      <Link href="/terms-and-conditions">
          <a>Terms & Conditions</a>
        </Link>
        <Link href="/prices">
          <a>prices</a>
        </Link>
        
      </div>
    </div>
  );
}

export default Footer;
