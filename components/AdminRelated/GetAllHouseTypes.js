import React, { useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";

function GetAllHouseTypes() {
  const [allTypes, setAllTypes] = useState([]);
  const [allowToChangeInputs, setAllowToChangeInputs] = useState(true);

  const getTypesInfo = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-house-types`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          setAllTypes(info.allHouseTypes);
        }
      });
  };

  const allowToMakeChanges = () => {
    setAllowToChangeInputs(!allowToChangeInputs);
  };

  const handleUpdate = (e) => {
    let typeID = e.target.value;
    let typeToUpdate = document.getElementById(e.target.value + "_type").value;

    fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-house-type-info`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          type_id: typeID,
          type: typeToUpdate,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        getTypesInfo();
        console.log(info.msg);
      });
  };

  const handleDelete = (e) => {
    let typeIdToDelete = e.target.value;

    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-delete-house-type`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        type_id: typeIdToDelete,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getTypesInfo();
        console.log(info.msg);
      });
  };

  const [typeToAdd, setTypeToAdd] = useState("");

  const handleAddType = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-add-house-type`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        type: typeToAdd,
      }),
    })
      .then((response) => response.json())
      .then((text) => {
        getTypesInfo();
        console.log(text.msg);
      });
    document.getElementById("my-form").reset();
  };

  return (
    <div className={styles.price_and_categories_container}>
      <div className={styles.categories}>
        <div className={styles.admin_links}>
          <button onClick={getTypesInfo}>Get All Types</button>
          <button onClick={allowToMakeChanges}>Allow Changes</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {allTypes.map((item) => (
              <tr key={item.id} className={styles.table_rows}>
                <td>{item.id}</td>
                <td>
                  <input
                    type="text"
                    id={item.id + "_type"}
                    defaultValue={item.type}
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
        onSubmit={handleAddType}
        id={"my-form"}
        className={styles.adder_form}
      >
        <h1>Add New Type</h1>
        <input
          type="text"
          placeholder="Type"
          onChange={(e) => setTypeToAdd(e.target.value)}
        />

        <button>ADD Type</button>
      </form>
    </div>
  );
}

export default GetAllHouseTypes;
