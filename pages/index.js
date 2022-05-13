import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import DisplayHouses from "../components/Reusable/DisplayListings/DisplayHouses";
import DisplayVehicles from "../components/Reusable/DisplayListings/DisplayVehicles";
import DisplayJobs from "../components/Reusable/DisplayListings/DisplayJobs";
import {
  getSpecialJobs,
  getSpecialHousesForSale,
  getSpecialHousesForRent,
  getSpecialVehiclesForSale,
  getSpecialVehiclesForRent,
} from "../components/UsefulFunctions/webViewFetches";

export default function Home() {
  const [sellingSpecialHouses, setSellingSpecialHouses] = useState([]);
  const [rentingSpecialHouses, setRentingSpecialHouses] = useState([]);
  const [sellingSpecialVehicles, setSellingSpecialVehicles] = useState([]);
  const [rentingSpecialVehicles, setRentingSpecialVehicles] = useState([]);

  const [specialJobs, setSpecialJobs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      let returnedSpecialJobs = await getSpecialJobs();
      let returnedSpecialHousesForSale = await getSpecialHousesForSale();
      let returnedSpecialHousesForRent = await getSpecialHousesForRent();
      let returnedSpecialVehiclesForSale = await getSpecialVehiclesForSale();
      let returnedSpecialVehiclesForRent = await getSpecialVehiclesForRent();

      if (isMounted) {
        setSpecialJobs(returnedSpecialJobs);
        setSellingSpecialHouses(returnedSpecialHousesForSale);
        setRentingSpecialHouses(returnedSpecialHousesForRent);
        setSellingSpecialVehicles(returnedSpecialVehiclesForSale);
        setRentingSpecialVehicles(returnedSpecialVehiclesForRent);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.homepage_container}>
      <PageHeader
        title="Home Page | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/favicon.ico"
      />
      {specialJobs && (
        <DisplayJobs
          containerTitle="Boosted Jobs"
          itemsToDisplay={specialJobs}
          amountOfItemsToDisplay={10}
          linkToPushTo="/jobs/"
        />
      )}
      {sellingSpecialHouses && (
        <DisplayHouses
          containerTitle="Houses for Sale"
          itemsToDisplay={sellingSpecialHouses}
          amountOfItemsToDisplay={10}
          linkToPushTo="/for-sale/houses/"
        />
      )}
      {rentingSpecialHouses && (
        <DisplayHouses
          containerTitle="Houses for Rent"
          itemsToDisplay={rentingSpecialHouses}
          amountOfItemsToDisplay={10}
          linkToPushTo="/for-rent/houses/"
        />
      )}
      {sellingSpecialVehicles && (
        <DisplayVehicles
          containerTitle="Vehicles for Sale"
          itemsToDisplay={sellingSpecialVehicles}
          amountOfItemsToDisplay={10}
          linkToPushTo="/for-sale/vehicles/"
        />
      )}
      {rentingSpecialVehicles && (
        <DisplayVehicles
          containerTitle="Vehicles for Rent"
          itemsToDisplay={rentingSpecialVehicles}
          amountOfItemsToDisplay={10}
          linkToPushTo="/for-rent/vehicles/"
        />
      )}
    </div>
  );
}
