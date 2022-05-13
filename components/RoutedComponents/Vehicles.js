import React, { useState, useEffect } from "react";
import DisplayVehicles from "../Reusable/DisplayListings/DisplayVehicles";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";
import { FaFilter } from "react-icons/fa";
import {
  getAllVehiclesForSale,
  getAllVehiclesForRent,
} from "../UsefulFunctions/webViewFetches";
import {
  vehicleMakes,
  vehicleTypes,
  vehicleTransmissions,
} from "../UsefulFunctions/vehiclesInfo";

function Vehicles({
  title,
  amountOfItemsToDisplay,
  linkToPushTo,
  vehiclesForSale,
  vehiclesForRent,
}) {
  const [loading, setLoading] = useState(false);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    let returnedAllVehicles;

    (async () => {
      if (vehiclesForRent) {
        returnedAllVehicles = await getAllVehiclesForRent();
      }
      if (vehiclesForSale) {
        returnedAllVehicles = await getAllVehiclesForSale();
      }

      if (isMounted) {
        setItemsToDisplay(returnedAllVehicles);
      }
    })();

    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  const [filterActivated, setFilterActivated] = useState(false);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("0");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("100000000000000");
  const [selectedMinYear, setSelectedMinYear] = useState("0");
  const [selectedMaxYear, setSelectedMaxYear] = useState("100000000000000");
  const [selectedMinMileage, setSelectedMinMileage] = useState("0");
  const [selectedMaxMileage, setSelectedMaxMileage] =
    useState("100000000000000");
  const [selectedZIP, setSelectedZIP] = useState("");

  const customFilter = () => {
    if (!filterActivated) {
      return itemsToDisplay;
    } else {
      return itemsToDisplay
        .filter((item) => item.type.includes(selectedType))
        .filter((item) => item.make.includes(selectedMake))
        .filter((item) => item.transmission.includes(selectedTransmission))

        .filter(
          (item) =>
            parseFloat(item.year) >= parseFloat(selectedMinYear) &&
            parseFloat(item.year) <= parseFloat(selectedMaxYear)
        )
        .filter(
          (item) =>
            parseFloat(item.mileage.replace(/,/g, "")) >=
              parseFloat(selectedMinMileage) &&
            parseFloat(item.mileage.replace(/,/g, "")) <=
              parseFloat(selectedMaxMileage)
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
              {vehicleTypes.map((item, index) => (
                <button
                  key={index}
                  value={item}
                  onClick={(e) => {
                    setSelectedType(e.target.value);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.sublinks_container_row}>
              <select
                name="vehicleMakes"
                id="vehicleMakes"
                onChange={(e) => setSelectedMake(e.target.value)}
              >
                <option value="">ALL Makes</option>
                {vehicleMakes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
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
                placeholder="min year"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMinYear("0");
                  else setSelectedMinYear(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="max year"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMaxYear("9999999999");
                  else setSelectedMaxYear(e.target.value);
                }}
              />
            </div>

            <div className={styles.sublinks_container_row}>
              <input
                type="text"
                placeholder="min mile"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMinMileage("0");
                  else setSelectedMinMileage(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="max mile"
                onChange={(e) => {
                  if (!e.target.value) setSelectedMaxMileage("9999999999");
                  else setSelectedMaxMileage(e.target.value);
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

      <DisplayVehicles
        containerTitle={title}
        itemsToDisplay={customFilter(itemsToDisplay)}
        amountOfItemsToDisplay={amountOfItemsToDisplay}
        linkToPushTo={linkToPushTo}
      />
    </div>
  );
}

export default Vehicles;
