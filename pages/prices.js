import styles from "../styles/Prices.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import { allPrices } from "../components/UsefulFunctions/prices";

function Prices() {
  console.log(allPrices);
  return (
    <>
      <div className={styles.prices_table_outer}>
        <PageHeader
          title="Prices | GorcKa.us"
          description="Prices"
          content="Prices - GorcKa.us"
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
      <div className={styles.images_section}>
        <div className={styles.images_section_title}>
          <h1>Advertisement locations on website</h1>
          <h3>Marked with <span className={styles.red_highlight}>RED</span></h3>
        </div>
        <div className={styles.images_section_container}>
          {allPrices.map((price) => (
            <>
              {price.location_image_link ? (
                <div key={price.id} className={styles.images_section_container_image}>
                  <h2>{price.name}</h2>
                  <img src={price.location_image_link} alt="location" />
                </div>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Prices;
