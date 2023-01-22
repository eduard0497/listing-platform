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
import {
  vehicleMakes,
  vehicleTypes,
  vehicleTransmissions,
} from "../UsefulFunctions/vehiclesInfo";

const defaultState = {
  title: "",
  type: "",
  make: "",
  model: "",
  year: "",
  color: "",
  transmission: "",
  mileage: "",
  price: "",
  frequency: "",
  details: ``,
  name: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  images: [],
  is_special: "",
};

function PostVehicleForRent() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const checkSubmission = () => {
    if (
      !data.title.length ||
      !data.type.length ||
      !data.make.length ||
      !data.model.length ||
      !data.year.length ||
      !data.name.length ||
      !data.phone.length ||
      !data.city.length ||
      !data.state.length ||
      !data.zip.length ||
      !data.images.length ||
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

  //

  const handlePostVehicleForSale = async () => {
    if (!checkSubmission()) {
      return;
    }

    setLoading(true);

    let cloudinaryLinks = [];

    for (let i = 0; i < data.images.length; i++) {
      let imageForm = new FormData();
      imageForm.append("file", data.images[i]);
      imageForm.append("upload_preset", "vehiclesForRent");
      await fetch("https://api.cloudinary.com/v1_1/gorcka-com/image/upload", {
        method: "POST",
        body: imageForm,
      })
        .then((res) => res.json())
        .then((data) => cloudinaryLinks.push(data.secure_url));
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-vehicle-for-rent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          access_token: sessionStorage.getItem("access_token"),

          //

          //   title: "2022 Fiat Doblo, 1.6L",
          //   type: "Sedan",
          //   make: "BMW",
          //   model: "530e",
          //   year: "2023",
          //   color: "Black",
          //   transmission: "Automatic",
          //   mileage: "135,000",
          //   price: "75,000",
          //   frequency: "Monthly",
          //   details: "ABS, ESP, On-board computer, Heated mirrors, Electric mirrors, Central locking, Parktronic, Steering wheel adjustment, Fog lights, New tires, CD/MP3, Purchased from a car dealership, Airbags, Air conditioning, Power steering, Power steering, Power windows, Sound insulation.",
          //   name: "Khoren",
          // phone: "818-747-4109",
          //   city: "Glendale",
          // state: "CA",
          // zip: "91205",
          //   images: ["https://res.cloudinary.com/gorcka-com/image/upload/v1673432555/gorckaimages/lu2cwc8wlq0b1bx7hhcn.jpg", "https://res.cloudinary.com/gorcka-com/image/upload/v1673432555/gorckaimages/k07dpmmcuim06n3pd7lh.jpg", "https://res.cloudinary.com/gorcka-com/image/upload/v1673432556/gorckaimages/eqjavusjlxd4rga91a0j.jpg"],
          //   is_special: true,

          //

          title: data.title,
          type: data.type,
          make: data.make,
          model: data.model,
          year: data.year,
          color: data.color,
          transmission: data.transmission,
          mileage: data.mileage,
          price: data.price,
          frequency: data.frequency,
          details: data.details,
          name: data.name,
          phone: data.phone,
          city: data.city,
          state: data.state,
          zip: data.zip,
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

  //

  const customOnChange = (itemToChange, e) => {
    setData((prevState) => ({
      ...prevState,
      [itemToChange]: e.target.value,
    }));
  };

  return (
    <div className={styles.form_parent_container}>
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />

      <div className={styles.form_box}>
        <h1>Post Vehicle for Rent</h1>

        <div className={styles.form_box_fields}>
          <input
            onChange={(e) => customOnChange("title", e)}
            type="text"
            placeholder="Title*"
            value={data.title}
          />
          <select
            name="vehicleTypes"
            id="vehicleTypes"
            onChange={(e) => customOnChange("type", e)}
            value={data.type}
          >
            <option value="">Vehicle Type*</option>
            {vehicleTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            name="vehicleMakes"
            id="vehicleMakes"
            onChange={(e) => customOnChange("make", e)}
            value={data.make}
          >
            <option value="">Vehicle Make*</option>
            {vehicleMakes.map((make, i) => (
              <option key={i} value={make}>
                {make}
              </option>
            ))}
          </select>
          <input
            onChange={(e) => customOnChange("model", e)}
            type="text"
            placeholder="Model*"
            value={data.model}
          />
          <input
            onChange={(e) => customOnChange("year", e)}
            type="text"
            placeholder="Year*"
            value={data.year}
          />
          <input
            onChange={(e) => customOnChange("color", e)}
            type="text"
            placeholder="Color"
            value={data.color}
          />
          <select
            name="vehicleTransmissions"
            id="vehicleTransmissions"
            onChange={(e) => customOnChange("transmission", e)}
            value={data.transmission}
          >
            <option value="">Vehicle Transmission*</option>
            {vehicleTransmissions.map((transmission, i) => (
              <option key={i} value={transmission}>
                {transmission}
              </option>
            ))}
          </select>
          <input
            onChange={(e) => customOnChange("mileage", e)}
            type="text"
            placeholder="Mileage"
            value={data.mileage}
          />
          <input
            onChange={(e) => customOnChange("price", e)}
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
            onChange={(e) => customOnChange("details", e)}
            value={data.details}
          ></textarea>
          <input
            onChange={(e) => customOnChange("name", e)}
            type="text"
            placeholder="Contact Name*"
            value={data.name}
          />
          <input
            onChange={(e) => customOnChange("phone", e)}
            type="text"
            placeholder="Contact Phone*"
            value={data.phone}
          />
          <input
            onChange={(e) => customOnChange("city", e)}
            type="text"
            placeholder="City*"
            value={data.city}
          />
          <input
            onChange={(e) => customOnChange("state", e)}
            type="text"
            placeholder="State*"
            value={data.state}
          />
          <input
            onChange={(e) => customOnChange("zip", e)}
            type="text"
            placeholder="Zip*"
            value={data.zip}
          />

          <div className={styles.image_upload_container}>
            <label htmlFor="images" className="logo_and_text_together">
              <BsUpload />{" "}
              {`Upload up to ${_max_allowed_images_to_upload} images*`}
            </label>
            {data.images.length != 0 ? (
              <h5>
                Files selected:{" "}
                {data.images.length > parseInt(_max_allowed_images_to_upload)
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
            onChange={(e) => customOnChange("is_special", e)}
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
              onClick={handlePostVehicleForSale}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostVehicleForRent;
