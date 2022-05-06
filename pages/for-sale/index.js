import React, { useState } from "react";
import Houses from "../../components/RoutedComponents/Houses";
import styles from "../../styles/Components/ReusableSubNavigators.module.css";

function GeneralForSale() {
  const [pickedCategory, setPickedCategory] = useState("");

  return (
    <div>
      <div className={styles.sublinks_container}>
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
