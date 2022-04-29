import React, { useState, useEffect } from "react";
import styles from "../styles/Prices.module.css";

function Prices() {
  const [allPrices, setAllPrices] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-all-pricing-info`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          setAllPrices(info.allPrices);
        }
      });
  }, []);
  console.log(allPrices);

  return (
    <div className={styles.prices_table_outer}>
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
