import React, { useState, useEffect } from "react";
import styles from "../styles/Prices.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import { getPrices } from "../components/UsefulFunctions/webViewFetches";

function Prices() {
  const [allPrices, setAllPrices] = useState([]);
  useEffect(() => {
    let isMounted = true;

    (async () => {
      let prices = await getPrices();

      if (isMounted) {
        setAllPrices(prices);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.prices_table_outer}>
      <PageHeader
        title="Prices | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <table className={styles.prices_table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Price ($)</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {allPrices.map((price) => (
            <tr key={price.id}>
              <td>{price.name}</td>
              <td>{price.price}</td>
              <td>{price.expires} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prices;
