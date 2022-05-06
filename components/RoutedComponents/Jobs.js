import React, { useState, useEffect } from "react";
import DisplayJobs from "../Reusable/DisplayListings/DisplayJobs";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";
import { getTypesForJobs, getAllJobs } from "../UsefulFunctions/webViewFetches";

function Jobs({ title, amountOfItemsToDisplay, linkToPushTo }) {
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
              value={item.name}
              onClick={(e) => {
                setSelectedType(e.target.value);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {loading && <p>Loading...</p>}
      </div>

      <DisplayJobs
        containerTitle={title}
        itemsToDisplay={customFilter(itemsToDisplay)}
        amountOfItemsToDisplay={amountOfItemsToDisplay}
        areWithoutImage={true}
        linkToPushTo={linkToPushTo}
      />
    </div>
  );
}

export default Jobs;
