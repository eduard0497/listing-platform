import React, { useState } from "react";
import styles from "../../../styles/Components/DisplayListings.module.css";
import ReactPaginate from "react-paginate";
import ImageSlider from "../ImageSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCalendarPlus,
  FaCar,
} from "react-icons/fa";
import { shortenText } from "../../UsefulFunctions/helperFunctions";
import Link from "next/link";

DisplayVehicles.defaultProps = {
  containerTitle: "Passed Title Here",
  itemsToDisplay: [],
  amountOfItemsToDisplay: 10,
};

function DisplayVehicles({
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

  //   .slice(pagesVisited, pagesVisited + itemsPerPage) -> esi returnneri mej

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
                    {item.make && (
                      <h5>
                        <FaCar /> {item.make} {item.model}, {item.year}
                      </h5>
                    )}
                    {item.price && <h5>$ {item.price}</h5>}
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

export default DisplayVehicles;
