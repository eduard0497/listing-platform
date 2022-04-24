import React, { useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";

function GetAllPrices() {
  const [allPrices, setAllPrices] = useState([]);
  const [allowToChangeInputs, setAllowToChangeInputs] = useState(true);

  const getGeneralPricingInfo = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-all-pricing-info`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          setAllPrices(info.allPrices);
        }
      });
  };

  const allowToMakeChanges = () => {
    setAllowToChangeInputs(!allowToChangeInputs);
  };

  const handleUpdate = (e) => {
    let priceID = e.target.value;
    let nameToUpdate = document.getElementById(e.target.value + "_name").value;
    let priceToChange = document.getElementById(
      e.target.value + "_price"
    ).value;
    let expirationToChange = document.getElementById(
      e.target.value + "_expires"
    ).value;

    let stripeLinkToChange = document.getElementById(
      e.target.value + "_stripe_link"
    ).value;
    let typeToChange = document.getElementById(e.target.value + "_type").value;

    fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-pricing-info`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          pricing_id: priceID,
          name: nameToUpdate,
          type: typeToChange,
          price: priceToChange,
          expires: expirationToChange,
          stripe_link: stripeLinkToChange,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        console.log(info.msg);
        getGeneralPricingInfo();
      });
  };

  const handleDelete = (e) => {
    let priceIdToDelete = e.target.value;

    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-delete-pricing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        pricing_id: priceIdToDelete,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info.msg);
        getGeneralPricingInfo();
      });
  };

  const [pricingNameToAdd, setPricingNameToAdd] = useState("");
  const [type, setType] = useState("");
  const [priceToAdd, setPriceToAdd] = useState("");
  const [expiresToAdd, setExpiresToAdd] = useState("");
  const [stripeLinkToAdd, setStripeLinkToAdd] = useState("");

  //
  const handleAddPricing = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-add-pricing-info`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        name: pricingNameToAdd,
        type: type,
        price: priceToAdd,
        expires: expiresToAdd,
        stripe_link: stripeLinkToAdd,
      }),
    })
      .then((response) => response.json())
      .then((text) => {
        console.log(text.msg);
        getGeneralPricingInfo();
      });
    document.getElementById("my-form").reset();
  };

  return (
    <div className={styles.price_and_categories_container}>
      <div className={styles.categories}>
        <div className={styles.manage_buttons}>
          <button onClick={getGeneralPricingInfo}>Get All Prices</button>
          <button onClick={allowToMakeChanges}>Allow Changes</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Price ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Expires in days</th>
              <th>Stripe Link</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {allPrices.map((item) => (
              <tr key={item.id} className={styles.table_rows}>
                <td>{item.id}</td>
                <td>
                  <input
                    type="text"
                    id={item.id + "_name"}
                    defaultValue={item.name}
                    readOnly={allowToChangeInputs}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id={item.id + "_type"}
                    defaultValue={item.type}
                    readOnly={allowToChangeInputs}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id={item.id + "_price"}
                    defaultValue={item.price}
                    readOnly={allowToChangeInputs}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={item.expires}
                    id={item.id + "_expires"}
                    readOnly={allowToChangeInputs}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={item.stripe_link}
                    id={item.id + "_stripe_link"}
                    readOnly={allowToChangeInputs}
                  />
                </td>
                <td>
                  <button
                    value={item.id}
                    onClick={handleUpdate}
                    className={styles.admin_update_button}
                  >
                    UPDATE
                  </button>
                </td>
                <td>
                  <button
                    value={item.id}
                    onClick={handleDelete}
                    className={styles.admin_delete_button}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={handleAddPricing}
        id={"my-form"}
        className={styles.adder_form}
      >
        <h1>Add New Pricing</h1>
        <input
          type="text"
          placeholder="Name For Advertisement"
          onChange={(e) => setPricingNameToAdd(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price For Ad"
          onChange={(e) => setPriceToAdd(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expires In Days"
          onChange={(e) => setExpiresToAdd(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stripe Link To Add"
          onChange={(e) => setStripeLinkToAdd(e.target.value)}
        />
        <button>ADD PRICING</button>
      </form>
    </div>
  );
}

export default GetAllPrices;
