import React from "react";
import styles from "../../styles/Components/Layout.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.footer_container}>
      <div>
        <h3>© 2022 Eduard H.</h3>
      </div>
      <div className={styles.footer_sublinks_container}>
      <Link href="/prices">
          <a>prices</a>
        </Link>
        <Link href="/privacy-policy">
          <a>privacy policy</a>
        </Link>
        <Link href="/terms-and-conditions">
          <a>Terms & Conditions</a>
        </Link>
        
      </div>
    </div>
  );
}

export default Footer;
