import React, { useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";

function GetAllJobCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [allowToChangeInputs, setAllowToChangeInputs] = useState(true);

  const getCategoriesInfo = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-job-categories`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else {
          setAllCategories(info.allJobCategories);
        }
      });
  };

  const allowToMakeChanges = () => {
    setAllowToChangeInputs(!allowToChangeInputs);
  };

  const handleUpdate = (e) => {
    let categoryID = e.target.value;
    let nameToUpdate = document.getElementById(e.target.value + "_name").value;

    fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-job-category-info`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          category_id: categoryID,
          name: nameToUpdate,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        getCategoriesInfo();
        console.log(info.msg);
      });
  };

  const handleDelete = (e) => {
    let categoryIdToDelete = e.target.value;

    fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-delete-job-category`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          category_id: categoryIdToDelete,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        getCategoriesInfo();
        console.log(info.msg);
      });
  };

  const [categoryNameToAdd, setCategoryNameToAdd] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-add-job-category`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        name: categoryNameToAdd,
      }),
    })
      .then((response) => response.json())
      .then((text) => {
        getCategoriesInfo();
        console.log(text.msg);
      });
    document.getElementById("my-form").reset();
  };

  return (
    <div className={styles.price_and_categories_container}>
      <div className={styles.categories}>
        <div  className={styles.admin_links}>
          <button onClick={getCategoriesInfo}>Get All Categories</button>
          <button onClick={allowToMakeChanges}>Allow Changes</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((item) => (
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
        onSubmit={handleAddCategory}
        id={"my-form"}
        className={styles.adder_form}
      >
        <h1>Add New Category</h1>
        <input
          type="text"
          placeholder="Category Name"
          onChange={(e) => setCategoryNameToAdd(e.target.value)}
        />

        <button>ADD CATEGORY</button>
      </form>
    </div>
  );
}

export default GetAllJobCategories;
