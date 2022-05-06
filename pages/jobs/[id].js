import React, { useState, useEffect } from "react";
import styles from "../../styles/ListingPages/Jobs.module.css";
import { useRouter } from "next/router";
import {
  FaCalendarPlus,
  FaBed,
  FaBath,
  FaDollarSign,
  FaChartArea,
  FaMapMarkerAlt,
  FaRegUser,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Listing() {
  const router = useRouter();
  const listingID = router.query.id;

  const [listing, setListing] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!listingID) {
        return;
      } else {
        fetch(
          `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-job?id=${listingID}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.msg) {
              console.log(data.msg);
            } else if (isMounted) {
              setListing(data.listing[0]);
            }
          });
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [listingID]);

  return (
    <>
      {listing ? (
        <div className={styles.container}>
          <h2>
            {listing.title}
            {" / "}
            {listing.type}
          </h2>

          <div className={styles.row}>
            <h4>
              <FaMapMarkerAlt />
              {listing.address && (
                <>
                  {" "}
                  {listing.address}
                  {","}
                </>
              )}{" "}
              {listing.city}, {listing.state} {listing.zip}
            </h4>
            <h4>
              <FaDollarSign />
              {listing.salary}
            </h4>
          </div>
          <div className={styles.row}>
            <h4>
              <FaRegUser />
              {listing.name}
            </h4>
            <h4>
              <FaEnvelope />
              {listing.email}
            </h4>
            <h4>
              <FaPhoneAlt />
              {listing.phone}
            </h4>
          </div>
          {/*  */}

          <pre>{listing.overview}</pre>
          <pre>{listing.requirements}</pre>

          {/*  */}
          <div className={styles.row}>
            <h4>Listing ID: {listing.id}</h4>
            <h4>
              <FaCalendarPlus />
              {new Date(listing.timestamp).toLocaleDateString()}
            </h4>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Listing;
