import React, { useState } from "react";
import styles from "../../styles/Components/DisplayListings.module.css";
import ReactPaginate from "react-paginate";
import ImageSlider from "./ImageSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft, FaCalendarPlus } from "react-icons/fa";
import { shortenText } from "../UsefulFunctions/helperFunctions";
import Link from "next/link";

DisplayListings.defaultProps = {
  containerTitle: "Passed Title Here",
  itemsToDisplay: [],
  amountOfItemsToDisplay: 10,
};

function DisplayListings({
  containerTitle,
  itemsToDisplay,
  amountOfItemsToDisplay,
  areWithoutImage,
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

  if (areWithoutImage) {
    return (
      <div className={styles.listings_container}>
        <div className={styles.listings_container_title}>
          <h1>{containerTitle}</h1>
        </div>

        <div className={styles.listings_container_row_cards_container}>
          {/*  */}

          {itemsToDisplay
            .slice(pagesVisited, pagesVisited + itemsPerPage)
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.listings_container_row_cards_card}
                >
                  <Link href={linkToPushTo + item.id}>
                    <a
                      className={
                        styles.listings_container_cards_container_card_info_title
                      }
                    >
                      {item.title}
                    </a>
                  </Link>
                  {/* <h3>{shortenText(item.title, 80)}</h3> */}
                  <div
                    className={
                      styles.listings_container_row_cards_card_text_box
                    }
                  >
                    <pre>{shortenText(item.overview, 150)}</pre>
                  </div>
                  <div
                    className={
                      styles.listings_container_cards_container_card_info_date_location
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
              );
            })}

          {/*  */}
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
      </div>
    );
  } else {
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
                        {item.title}
                      </a>
                    </Link>
                    <div
                      className={
                        styles.listings_container_cards_container_card_info_date_location
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
}

export default DisplayListings;
