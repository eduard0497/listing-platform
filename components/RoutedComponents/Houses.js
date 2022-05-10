import React, { useState, useEffect } from "react";
import DisplayHouses from "../Reusable/DisplayListings/DisplayHouses";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";
import { FaFilter } from "react-icons/fa";
import {
  getTypesForHouses,
  getAllHousesForSale,
  getAllHousesForRent,
} from "../UsefulFunctions/webViewFetches";

// stegh heto kanem housesForRent-y,,, + webViewFetches-mej el functiony avelacne

function Houses({
  title,
  amountOfItemsToDisplay,
  linkToPushTo,
  housesForSale,
  housesForRent,
}) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    (async () => {
      let returnedHouseTypes = await getTypesForHouses();
      let returnedAllHouses = [];
      if (housesForRent) {
        returnedAllHouses = await getAllHousesForRent();
      }
      if (housesForSale) {
        returnedAllHouses = await getAllHousesForSale();
      }

      if (isMounted) {
        setFilters(returnedHouseTypes);
        setItemsToDisplay(returnedAllHouses);
      }
    })();

    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  const [filterActivated, setFilterActivated] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedMinBeds, setSelectedMinBeds] = useState("0");
  const [selectedMaxBeds, setSelectedMaxBeds] = useState("99999999");
  const [selectedMinPrice, setSelectedMinPrice] = useState("0");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("100000000000000");
  const [selectedZIP, setSelectedZIP] = useState("");

  const customFilter = () => {
    if (!filterActivated) {
      return itemsToDisplay;
    } else {
      return itemsToDisplay
        .filter((item) => item.type.includes(selectedType))
        .filter(
          (item) =>
            parseFloat(item.beds) >= parseFloat(selectedMinBeds) &&
            parseFloat(item.beds) <= parseFloat(selectedMaxBeds)
        )
        .filter(
          (item) =>
            parseFloat(item.price.replace(/,/g, "")) >=
              parseFloat(selectedMinPrice) &&
            parseFloat(item.price.replace(/,/g, "")) <=
              parseFloat(selectedMaxPrice)
        )
        .filter((item) => item.zip.includes(selectedZIP));
    }
  };

  return (
    <div>
      <div className={styles.sublinks_container}>
        <button onClick={() => setFilterActivated(!filterActivated)}>
          <FaFilter />
          Turn Filter On/Off
        </button>

        {filterActivated && (
          <div className={styles.sublinks_container_filters}>
            <div className={styles.sublinks_container_row}>
              <button onClick={() => setSelectedType("")}>ALL</button>
              {filters.map((item) => (
                <button
                  key={item.id}
                  value={item.type}
                  onClick={(e) => {
                    setSelectedType(e.target.value);
                  }}
                >
                  {item.type}
                </button>
              ))}
            </div>

            <div className={styles.sublinks_container_row}>
              <input
                type="text"
                placeholder="min beds"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMinBeds("0");
                  else setSelectedMinBeds(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="max beds"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMaxBeds("9999999999");
                  else setSelectedMaxBeds(e.target.value);
                }}
              />
            </div>

            <div className={styles.sublinks_container_row}>
              <input
                type="text"
                placeholder="min price"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMinPrice("0");
                  else setSelectedMinPrice(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="max price"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMaxPrice("9999999999");
                  else setSelectedMaxPrice(e.target.value);
                }}
              />
            </div>
            <div className={styles.sublinks_container_row}>
              <input
                type="text"
                placeholder="zip"
                onChange={(e) => {
                  setSelectedZIP(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        {loading && <p>Loading...</p>}
      </div>

      <DisplayHouses
        containerTitle={title}
        itemsToDisplay={customFilter(itemsToDisplay)}
        amountOfItemsToDisplay={amountOfItemsToDisplay}
        linkToPushTo={linkToPushTo}
      />
    </div>
  );
}

export default Houses;
