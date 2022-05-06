import React, { useState, useEffect } from "react";
import styles from "../../../styles/ListingPages/Houses.module.css";
import ImageSlider from "../../../components/Reusable/ImageSlider";
import { useRouter } from "next/router";
import {
  FaCalendarPlus,
  FaBed,
  FaBath,
  FaDollarSign,
  FaChartArea,
  FaMapMarkerAlt,
  FaRegUser,
  FaPhoneVolume,
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
          `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-house-for-sale?id=${listingID}`
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

  console.log(listing);

  return (
    <>
      {listing ? (
        <div className={styles.container}>
          <div className={styles.container_images}>
            <ImageSlider images={listing.images} />
          </div>
          <h2>{listing.title}{" / "}{listing.type}</h2>
          <div className={styles.row}>
            <h4>
              <FaBed />
              {listing.beds}
            </h4>
            <h4>
              <FaBath />
              {listing.baths}
            </h4>
            <h4>
              <FaDollarSign />
              {listing.price}
            </h4>
            <h4>
              <FaChartArea />
              {listing.total_area}
            </h4>
          </div>
          <div className={styles.row}>
            <h4>
              <FaMapMarkerAlt />
              {listing.city}, {listing.state} {listing.zip}
            </h4>
            <h4>
              <FaRegUser />
              {listing.name}
            </h4>
            <h4>
              <FaPhoneVolume />
              {listing.phone}
            </h4>
          </div>
		  <pre>{listing.details}</pre>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Listing;
