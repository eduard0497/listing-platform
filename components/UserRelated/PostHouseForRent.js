import React, { useState, useEffect } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import {
  _ring_loader_color,
  _ring_loader_size,
  _max_allowed_images_to_upload,
} from "../UsefulFunctions/globalVariables";
import Popup from "../Reusable/Popup";
import { BsUpload } from "react-icons/bs";
import { houseTypes } from "../UsefulFunctions/houseTypes";

const defaultState = {
  title: "",
  type: "",
  beds: "",
  baths: "",
  total_area: "",
  price: "",
  frequency: "",
  details: ``,
  city: "",
  state: "",
  zip: "",
  name: "",
  phone: "",
  images: [],
  is_special: "",
};

function PostHouseForRent() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const checkSubmission = () => {
    if (
      !data.title.length ||
      !data.type.length ||
      !data.city.length ||
      !data.state.length ||
      !data.zip.length ||
      !data.name.length ||
      !data.images.length ||
      !data.phone.length ||
      !data.is_special
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else if (data.images.length > _max_allowed_images_to_upload) {
      setInfoForUser("Too many images are selected");
      setShowInfoForUser(true);
    } else {
      return true;
    }
  };

  const handlePostHouseForRent = async () => {
    if (!checkSubmission()) {
      return;
    }

    setLoading(true);

    let cloudinaryLinks = [];

    for (let i = 0; i < data.images.length; i++) {
      let imageForm = new FormData();
      imageForm.append("file", data.images[i]);
      imageForm.append("upload_preset", "housesForRent");
      await fetch("https://api.cloudinary.com/v1_1/gorcka-com/image/upload", {
        method: "POST",
        body: imageForm,
      })
        .then((res) => res.json())
        .then((data) => cloudinaryLinks.push(data.secure_url));
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-house-for-rent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          access_token: sessionStorage.getItem("access_token"),

          //

          //   title: "Two story stone house on Haghtanaki 1 street in Malatia-Sebastia, 184 sq.m., 2 bathrooms",
          //   type: "House",
          //   beds: "4",
          //   baths: "2",
          //   total_area: "7,000",
          //   price: "150,000",
          //   frequency: "Monthly",
          //   details: "The house is located at the beginning of Haghtanak district, uninhabited, newly built with high-quality building materials.",
          //   city: "Glendale",
          // state: "CA",
          // zip: "91205",
          // name: "Khoren",
          // phone: "818-747-4109",
          //   images: ["https://res.cloudinary.com/gorcka-com/image/upload/v1673432375/gorckaimages/wvhjw0vyadmtfdtkyf2l.jpg", "https://res.cloudinary.com/gorcka-com/image/upload/v1673432376/gorckaimages/ny5qhzxqzpevts8kxy6b.jpg", "https://res.cloudinary.com/gorcka-com/image/upload/v1673432377/gorckaimages/hsxoblm05oodwzaidku4.jpg"],
          //   is_special: true,

          //

          title: data.title,
          type: data.type,
          beds: data.beds,
          baths: data.baths,
          total_area: data.total_area,
          price: data.price,
          frequency: data.frequency,
          details: data.details,
          city: data.city,
          state: data.state,
          zip: data.zip,
          name: data.name,
          phone: data.phone,
          images: cloudinaryLinks,
          is_special: data.is_special,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        setInfoForUser(info.msg);
        setShowInfoForUser(true);
        setData(defaultState);
      });

    setLoading(false);
  };

  return (
    <div className={styles.form_parent_container}>
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />
      <div className={styles.form_box}>
        <h1>Post House for Rent</h1>
        <div className={styles.form_box_fields}>
          {/*  */}
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            type="text"
            placeholder="Title*"
            value={data.title}
          />
          <select
            name="houseType"
            id="houseType"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
            value={data.type}
          >
            <option value="">Select House Type*</option>
            {houseTypes.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                beds: e.target.value,
              }))
            }
            type="text"
            placeholder="Beds"
            value={data.beds}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                baths: e.target.value,
              }))
            }
            type="text"
            placeholder="Baths"
            value={data.baths}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                total_area: e.target.value,
              }))
            }
            type="text"
            placeholder="Total Area (sqft)"
            value={data.total_area}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
            type="text"
            placeholder="Price"
            value={data.price}
          />
          <select
            name="frequency"
            id="frequency"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                frequency: e.target.value,
              }))
            }
            value={data.frequency}
          >
            <option value="">Choose Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <textarea
            cols="30"
            rows="10"
            placeholder="Details"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                details: e.target.value,
              }))
            }
            value={data.details}
          ></textarea>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                city: e.target.value,
              }))
            }
            type="text"
            placeholder="City*"
            value={data.city}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                state: e.target.value,
              }))
            }
            type="text"
            placeholder="State*"
            value={data.state}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                zip: e.target.value,
              }))
            }
            type="text"
            placeholder="Zip*"
            value={data.zip}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            type="text"
            placeholder="Contact Name*"
            value={data.name}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
            type="text"
            placeholder="Contact Phone*"
            value={data.phone}
          />

          <div className={styles.image_upload_container}>
            <label htmlFor="images" className="logo_and_text_together">
              <BsUpload />{" "}
              {`Upload up to ${_max_allowed_images_to_upload} images*`}
            </label>
            {data.images.length != 0 ? (
              <h5>
                Files selected:{" "}
                {data.images.length >
                parseInt(
                  _max_allowed_images_to_upload
                )
                  ? "Exceeds the limit"
                  : data.images.length}
              </h5>
            ) : null}
            <input
              type="file"
              id="images"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  images: e.target.files,
                }))
              }
              multiple
              accept="image/*"
            />
          </div>
          <select
            name="listingType"
            id="listingType"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_special: e.target.value,
              }))
            }
            value={data.is_special}
          >
            <option value="">Choose Listing Option*</option>
            <option value={true}>SPECIAL</option>
            <option value={false}>Regular</option>
          </select>
        </div>

        <div className={styles.form_box_control_buttons}>
          <button
            className={styles.general_form_clear_button}
            onClick={(e) => setData(defaultState)}
          >
            CLEAR
          </button>

          {loading ? (
            <button className={styles.general_form_submit_button}>
              <RingLoader
                color={_ring_loader_color}
                loading={loading}
                size={_ring_loader_size}
              />
            </button>
          ) : (
            <button
              className={styles.general_form_submit_button}
              onClick={handlePostHouseForRent}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostHouseForRent;
