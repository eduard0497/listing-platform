import React, { useState, useEffect } from "react";
import styles from "../../../styles/ListingPages/SingleListing.module.css";
import stylesOne from "../../../styles/Components/Layout.module.css";
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
  FaPhoneAlt,
} from "react-icons/fa";
import PropagateLoader from "react-spinners/PropagateLoader";
import PageHeader from "../../../components/Reusable/PageHeader";

function Listing() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const listingID = router.query.id;

  const [listing, setListing] = useState(null);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    (async () => {
      if (!listingID) {
        return;
      } else {
        fetch(
          `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-house-for-rent?id=${listingID}`
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

    setLoading(false);

    return () => {
      isMounted = false;
    };
  }, [listingID]);

  return (
    <>
      <PageHeader
        title="Jobs | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      {listing ? (
        <div className={styles.container}>
          <div className={styles.container_images}>
            <ImageSlider images={listing.images} displayCarousel={true} />
          </div>
          <h2>
            {listing.title}
            {" / "}
            {listing.type}
          </h2>
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
              {listing.price}{" "}
              {listing.frequency && `${" " + listing.frequency}`}
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
              <FaPhoneAlt />
              {listing.phone}
            </h4>
          </div>
          <pre>{listing.details}</pre>
          <div className={styles.row}>
            <h4>Listing ID: {listing.id}</h4>
            <h4>
              <FaCalendarPlus />
              {new Date(listing.timestamp).toLocaleDateString()}
            </h4>
          </div>
        </div>
      ) : (
        <div className={stylesOne.layout_loading}>
          <PropagateLoader
            color={process.env.NEXT_PUBLIC_CLIP_LOADER_COLOR}
            loading={loading}
            size={20}
          />
        </div>
      )}
    </>
  );
}

export default Listing;
