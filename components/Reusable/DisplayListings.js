import React, { useState } from "react";
import styles from "../../styles/Components/DisplayListings.module.css";
import ReactPaginate from "react-paginate";
import ImageSlider from "./ImageSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
// eji vra poxelu baner kan, te inch cuyc ta card-i vra
// pagination styling
// change image buttons
// card-eri guynery avelacnem css-i mej
// myusnern el

DisplayListings.defaultProps = {
  containerTitle: "Passed Title Here",
  itemsToDisplay: [],
  amountOfItemsToDisplay: 10,
};

function DisplayListings({
  containerTitle,
  itemsToDisplay,
  amountOfItemsToDisplay,
}) {
  if (itemsToDisplay.length === 0) {
    return null;
  }

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = amountOfItemsToDisplay;
  const pagesVisited = pageNumber * itemsPerPage;

  //   .slice(pagesVisited, pagesVisited + itemsPerPage) -> esi returnneri mej

  const pageCount = Math.ceil(itemsToDisplay.length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className={styles.home_special_listings_container}>
      <div className={styles.home_special_listings_container_title}>
        <h1>{containerTitle}</h1>
      </div>
      <div className={styles.home_special_listings_container_cards_container}>
        {/* esia dynamically render anelu */}
        {itemsToDisplay
          .slice(pagesVisited, pagesVisited + itemsPerPage)
          .map((item) => {
            return (
              <div
                key={item.title}
                className={
                  styles.home_special_listings_container_cards_container_card
                }
              >
                <div
                  className={
                    styles.home_special_listings_container_cards_container_card_image
                  }
                >
                  <ImageSlider images={item.images} />
                </div>
                <div
                  className={
                    styles.home_special_listings_container_cards_container_card_info
                  }
                >
                  <h3>{item.title}</h3>
                  <div
                    className={
                      styles.home_special_listings_container_cards_container_card_info_date_location
                    }
                  >
                    {item.city ? (
                      <h5>
                        {<FaMapMarkerAlt />} {item.city}, {item.state} {item.zip}
                      </h5>
                    ) : (
                      "City, State Zip"
                    )}

                    <h5>Exp: {new Date(item.timestamp).toLocaleDateString()}</h5>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.home_special_listings_container_pagination}>
        {itemsToDisplay.length < itemsPerPage ? null : (
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="pagination_container"
            previousLinkClassName="pagination_previous_button"
            nextLinkClassName="pagination_next_button"
            disabledClassName="pagination_disabled_button"
            activeClassName="pagination_active_button"
          />
        )}
      </div>
    </div>
  );
}

export default DisplayListings;
