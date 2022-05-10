import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Houses from "../../components/RoutedComponents/Houses";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";

function GeneralForSale() {
  const [pickedCategory, setPickedCategory] = useState("");

  // useEffect(() => {

  // }, [])

  return (
    <div>
      <PageHeader
        title="For Sale | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/favicon.ico"
      />
      <div id="scrollTo" className={styles.sublinks_container}>
        <div className={styles.sublinks_container_navigators}>
          <button onClick={() => setPickedCategory("houses-for-sale")}>
            Houses
          </button>
          <button onClick={() => setPickedCategory("vehicles-for-sale")}>
            Vehicles
          </button>
          <button onClick={() => setPickedCategory("others-for-sale")}>
            Other
          </button>
        </div>
      </div>
      {/*  */}
      {pickedCategory == "houses-for-sale" ? (
        <Houses
          title="Houses For Sale"
          amountOfItemsToDisplay={30}
          linkToPushTo="/for-sale/houses/"
          housesForSale={true}
        />
      ) : null}
    </div>
  );
}

export default GeneralForSale;
