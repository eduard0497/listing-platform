import React, { useState, useEffect } from "react";
import DisplayListings from "../Reusable/DisplayListings";
import { connectArraysAndSortInDescending } from "../UsefulFunctions/helperFunctions";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";
import {
  getTypesForHouses,
  getAllHousesForSale,
  getTypesForJobs,
  getAllJobs,
} from "../UsefulFunctions/webViewFetches";

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

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (housesForSale) {
      (async () => {
        let returnedHouseTypes = await getTypesForHouses();
        let returnedAllHouses = await getAllHousesForSale();
        if (isMounted) {
          setFilters(returnedHouseTypes);
          setItemsToDisplay(returnedAllHouses);
        }
      })();
    } else if (jobs) {
      (async () => {
        let returnedJobTypes = await getTypesForJobs();
        let returnedJobs = await getAllJobs();
        if (isMounted) {
          setFilters(returnedJobTypes);
          setItemsToDisplay(returnedJobs);
        }
      })();
    }

    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  const [objectToFilterWith, setObjectToFilterWith] = useState({
    type: "",
    beds: "",
    baths: "",
    price: "",
    total_area: "",
    zip: "",
  });

  console.log(objectToFilterWith);

  const customFilter = () => {
    if (!selectedFilter) {
      return itemsToDisplay;
    } else {
      return itemsToDisplay.filter((item) => item.type == selectedFilter);
    }

    /*

    
    
    
    */
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

      <h2>AAAAAA</h2>
      <input
        type="text"
        placeholder="type"
        onChange={(e) =>
          setObjectToFilterWith({ ...objectToFilterWith, type: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="beds"
        onChange={(e) =>
          setObjectToFilterWith({ ...objectToFilterWith, beds: e.target.value })
        }
      />
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

/*

replace(/,/g, '');
if (itemsToDisplay.length != 0) {
  console.log(itemsToDisplay[0].price.replace(/,/g, ""));
  console.log(parseFloat(itemsToDisplay[0].price.replace(/,/g, "")));
  console.log(parseFloat(itemsToDisplay[0].baths.replace(/,/g, "")));
  console.log(itemsToDisplay);
}

*/
