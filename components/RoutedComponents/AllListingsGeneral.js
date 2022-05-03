import React, { useState, useEffect } from "react";
import DisplayListings from "../Reusable/DisplayListings";
import { connectArraysAndSortInDescending } from "../UsefulFunctions/helperFunctions";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";

function AllListingsGeneral({
  title,
  amountOfItemsToDisplay,
  linkToPushTo,
  jobs,
  areWithoutImage,
  housesForSale,
}) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  // all functions predefined
  const getTypesForHouses = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-house-types`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          setFilters(info.allHouseTypes);
        }
      });
  };

  const getHousesForSale = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-houses-for-sale`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          let sortedArray = connectArraysAndSortInDescending(
            info.specialHousesForSale,
            info.regularHousesForSale
          );
          setItemsToDisplay(sortedArray);
        }
      });
  };

  const getJobTypes = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-job-categories`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          setFilters(info.allJobCategories);
        }
      });
  };

  const getJobs = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-jobs`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          let sortedArray = connectArraysAndSortInDescending(
            info.specialJobs,
            info.regularJobs
          );
          setItemsToDisplay(sortedArray);
        }
      });
  };

  useEffect(() => {
    setLoading(true);

    if (housesForSale) {
      getTypesForHouses();
      getHousesForSale();
    } else if (jobs) {
      getJobTypes();
      getJobs();
    }

    setLoading(false);
  }, []);

  const customFilter = () => {
    if (!selectedFilter) {
      return itemsToDisplay;
    } else {
      return itemsToDisplay.filter((item) => item.type == selectedFilter);
    }
  };

  return (
    <div>
      <div className={styles.sublinks_container}>
        <div className={styles.sublinks_container_filters}>
          <button onClick={() => setSelectedFilter("")}>ALL</button>
          {filters.map((item) => (
            <button
              key={item.id}
              value={item.type || item.name}
              onClick={(e) => {
                setSelectedFilter(e.target.value);
              }}
            >
              {item.type || item.name}
            </button>
          ))}
        </div>
        {loading && <p>Loading...</p>}
      </div>
      <DisplayListings
        containerTitle={title}
        itemsToDisplay={customFilter(itemsToDisplay)}
        amountOfItemsToDisplay={amountOfItemsToDisplay}
        areWithoutImage={areWithoutImage}
        linkToPushTo={linkToPushTo}
      />
    </div>
  );
}

export default AllListingsGeneral;
