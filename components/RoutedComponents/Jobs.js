import React, { useState, useEffect } from "react";
import DisplayListings from "../Reusable/DisplayListings";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";
// import { FaFilter } from "react-icons/fa";
import { getTypesForJobs, getAllJobs } from "../UsefulFunctions/webViewFetches";

function AllListingsGeneral({ title, amountOfItemsToDisplay, linkToPushTo }) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    (async () => {
      let returnedJobTypes = await getTypesForJobs();
      let returnedJobs = await getAllJobs();
      if (isMounted) {
        setFilters(returnedJobTypes);
        setItemsToDisplay(returnedJobs);
      }
    })();

    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  const [selectedType, setSelectedType] = useState("");
  //   const [filterActivated, setFilterActivated] = useState(true);
  //   const [selectedMinBeds, setSelectedMinBeds] = useState("0");
  //   const [selectedMaxBeds, setSelectedMaxBeds] = useState("99999999");

  const customFilter = () => {
    if (!selectedType) {
      return itemsToDisplay;
    } else {
      return itemsToDisplay.filter((item) => item.type == selectedType);
    }
  };

  return (
    <div>
      <div className={styles.sublinks_container}>
        <div className={styles.sublinks_container_row}>
          <button onClick={() => setSelectedType("")}>ALL</button>
          {filters.map((item) => (
            <button
              key={item.id}
              value={item.type || item.name}
              onClick={(e) => {
                setSelectedType(e.target.value);
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
        areWithoutImage={true}
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
