import React, { useState, useEffect } from "react";
import DisplayServices from "../Reusable/DisplayListings/DisplayServices";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";
import { getAllServices } from "../UsefulFunctions/webViewFetches";
import { serviceTypes } from "../UsefulFunctions/serviceTypes";

function Services({ title, amountOfItemsToDisplay, linkToPushTo }) {
  const [loading, setLoading] = useState(false);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    (async () => {
      let returnedServices = await getAllServices();
      if (isMounted) {
        setItemsToDisplay(returnedServices);
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
        <div className={styles.sublinks_container_filters}>
          <div className={styles.sublinks_container_row}>
            <select
              name="serviceTypes"
              id="serviceTypes"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">ALL Services</option>
              {serviceTypes.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* <button onClick={() => setSelectedType("")}>ALL</button>
          {serviceTypes.map((item) => (
            <button
              key={item}
              value={item}
              onClick={(e) => {
                setSelectedType(e.target.value);
              }}
            >
              {item}
            </button>
          ))} */}
        </div>

        {loading && <p>Loading...</p>}
      </div>

      <DisplayServices
        containerTitle={title}
        itemsToDisplay={customFilter(itemsToDisplay)}
        amountOfItemsToDisplay={amountOfItemsToDisplay}
        linkToPushTo={linkToPushTo}
      />
    </div>
  );
}

export default Services;
