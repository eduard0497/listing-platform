import React, { useState } from "react";
import styles from "../../../styles/Components/DisplayListings.module.css";
import ReactPaginate from "react-paginate";
import ImageSlider from "../ImageSlider";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCalendarPlus,
  FaRegUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { shortenText } from "../../UsefulFunctions/helperFunctions";
import Link from "next/link";

DisplayServices.defaultProps = {
  containerTitle: "Passed Title Here",
  itemsToDisplay: [],
  amountOfItemsToDisplay: 10,
};

function DisplayServices({
  containerTitle,
  itemsToDisplay,
  amountOfItemsToDisplay,
  linkToPushTo,
}) {
  const [pageNumber, setPageNumber] = useState(0);
  if (!itemsToDisplay.length) {
    return null;
  }

  const itemsPerPage = amountOfItemsToDisplay;
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(itemsToDisplay.length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className={styles.listings_container}>
      <div className={styles.listings_container_title}>
        <h1>{containerTitle}</h1>
      </div>
      <div className={styles.listings_container_cards_container}>
        {/* esia dynamically render anelu */}
        {itemsToDisplay
          .slice(pagesVisited, pagesVisited + itemsPerPage)
          .map((item) => {
            return (
              <div
                key={item.id}
                className={styles.listings_container_cards_container_card}
              >
                <div
                  className={
                    styles.listings_container_cards_container_card_image
                  }
                >
                  <ImageSlider images={item.images} />
                </div>

                <div
                  className={
                    styles.listings_container_cards_container_card_info
                  }
                >
                  <Link href={linkToPushTo + item.id}>
                    <a
                      className={
                        styles.listings_container_cards_container_card_info_title
                      }
                    >
                      {shortenText(item.title, 30)}
                    </a>
                  </Link>
                  <div
                    className={
                      styles.listings_container_cards_container_card_info_seperated
                    }
                  >
                    {item.name && (
                      <h5>
                        <FaRegUser /> {item.name}
                      </h5>
                    )}

                    {item.email && (
                      <h5>
                        <FaEnvelope /> {item.email}
                      </h5>
                    )}
                    {item.phone && (
                      <h5>
                        <FaPhoneAlt /> {item.phone}
                      </h5>
                    )}
                  </div>
                  <div
                    className={
                      styles.listings_container_cards_container_card_info_seperated
                    }
                  >
                    {item.city ? (
                      <h5>
                        {<FaMapMarkerAlt />} {item.city}, {item.state}{" "}
                        {item.zip}
                      </h5>
                    ) : (
                      "City, State Zip"
                    )}

                    <h5>
                      {<FaCalendarPlus />}{" "}
                      {new Date(item.timestamp).toLocaleDateString()}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {itemsToDisplay.length < itemsPerPage ? null : (
        <div className={styles.listings_container_pagination}>
          <ReactPaginate
            previousLabel={<FaArrowLeft />}
            nextLabel={<FaArrowRight />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="pagination_container"
            previousLinkClassName="pagination_previous_button"
            nextLinkClassName="pagination_next_button"
            disabledClassName="pagination_disabled_button"
            activeClassName="pagination_active_button"
          />
        </div>
      )}
    </div>
  );
}

export default DisplayServices;
