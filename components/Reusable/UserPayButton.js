import React from "react";
import styles from "../../styles/Components/UserPayButton.module.css";
import Link from "next/link";

function UserPayButton({ status, listingID, stripeLink }) {
  let paidListings = JSON.parse(sessionStorage.getItem("paid_listings"));

  if (status == "pending") {
    return (
      <button className={styles.pending}>
        Not Ready For Payment
      </button>
    );
  } else if (status == "waiting") {
    return (
      <>
        {!paidListings.includes(listingID) ? (
          <button className={styles.paid}>ALREADY PAID</button>
        ) : (
          <Link href={`${stripeLink}?client_reference_id=${listingID}`}>
            <button className={styles.waiting}>Click To PAY</button>
          </Link>
        )}
      </>
    );
  } else {
    return null;
  }
}

export default UserPayButton;
