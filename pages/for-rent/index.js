import React, { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Houses from "../../components/RoutedComponents/Houses";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";

function GeneralForRent() {
  const [pickedCategory, setPickedCategory] = useState("");

  return (
    <div>
      <PageHeader
        title="For Rent | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/favicon.ico"
      />
      <div className={styles.sublinks_container}>
        <div className={styles.sublinks_container_navigators}>
          <button onClick={() => setPickedCategory("houses-for-rent")}>
            Houses
          </button>
          <button onClick={() => setPickedCategory("vehicles-for-rent")}>
            Vehicles
          </button>
          <button onClick={() => setPickedCategory("others-for-rent")}>
            Other
          </button>
        </div>
      </div>
      {/*  */}
      {pickedCategory == "houses-for-rent" ? (
        <Houses
          title="Houses For Rent"
          amountOfItemsToDisplay={30}
          linkToPushTo="/for-rent/houses/"
          housesForRent={true}
        />
      ) : null}
    </div>
  );
}

export default GeneralForRent;
