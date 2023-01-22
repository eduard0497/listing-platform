import React, { useState, useEffect } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import {
  _ring_loader_color,
  _ring_loader_size,
  _max_allowed_images_to_upload
} from "../UsefulFunctions/globalVariables";
import Popup from "../Reusable/Popup";
import { serviceTypes } from "../UsefulFunctions/serviceTypes";
import { BsUpload } from "react-icons/bs";

//
const defaultState = {
  title: "",
  type: "",
  details: ``,
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  images: [],
  is_special: "",
};

function PostService() {
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const [data, setData] = useState(defaultState);

  const checkSubmission = () => {
    if (
      !data.title.length ||
      !data.type.length ||
      !data.city.length ||
      !data.state.length ||
      !data.zip.length ||
      !data.name.length ||
      !data.is_special
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else if (!data.phone.length && !data.email.length) {
      setInfoForUser("Please include either email or phone.");
      setShowInfoForUser(true);
    } else if(data.images.length > _max_allowed_images_to_upload) {
      setInfoForUser("Too many images are selected");
      setShowInfoForUser(true);
    } else {
      return true;
    }
  };

  const handlePostJob = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);

    let cloudinaryLinks = [];

    for (let i = 0; i < data.images.length; i++) {
      let imageForm = new FormData();
      imageForm.append("file", data.images[i]);
      imageForm.append("upload_preset", "services");
      await fetch("https://api.cloudinary.com/v1_1/gorcka-com/image/upload", {
        method: "POST",
        body: imageForm,
      })
        .then((res) => res.json())
        .then((data) => cloudinaryLinks.push(data.secure_url));
    }

    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-service`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        access_token: sessionStorage.getItem("access_token"),

        // 

        // title: "Եռակցող բարձր որակ և մատչելի сварщик сварка svarshik սվարչիկ սվարշիկ զոդող զոդման",
        // type: "Construction",
        // details: "Դարպաս դարբաս ճաղավանդակ ճաղեր դարբին դարբնի գործ դարբնի գործեր պատվերով երկաթա դուռ երկաթյա երկաթ, եռակցում սվառկա պերիլա նավես կռիշ կրիշ կազիռոկ կազիրոկ ժոլոբ տանիք տանիքի ծածկ ջրահեռացում ջրահեռացման խողովակ լուսամուտ վանդակ սվառկի գոռծ սվարկի գօրծ շինարարություն ֆլանեց",
        // name: "Khoren",
        // email: "khorhov@gmail.com",
        // phone: "818-747-4109",
        // city: "Glendale",
        // state: "CA",
        // zip: "91205",
        // images: ["https://res.cloudinary.com/gorcka-com/image/upload/v1673432295/gorckaimages/r5z5y37oi7pi5jfkcuiv.jpg", "https://res.cloudinary.com/gorcka-com/image/upload/v1673259019/gorckaimages/lbi9jvmmkdqejg9kafxx.jpg"],
        // is_special: true,

        //


        title: data.title,
        type: data.type,
        details: data.details,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        zip: data.zip,
        images: cloudinaryLinks,
        is_special: data.is_special,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        setInfoForUser(info.msg);
        setShowInfoForUser(true);
        setData(defaultState);
      });

    setLoading(false);
  };

  const customOnChange = (itemToChange, value) => {
    setData((prevState) => ({
      ...prevState,
      [itemToChange]: value,
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
        <h1>Post Service</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) => customOnChange("title", e.target.value)}
            type="text"
            placeholder="Title*"
            value={data.title}
          />

          <select
            name="serviceTypes"
            id="serviceTypes"
            onChange={(e) => customOnChange("type", e.target.value)}
            value={data.type}
          >
            <option value="">Select Service Type*</option>
            {serviceTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <textarea
            cols="30"
            rows="10"
            placeholder="Details"
            onChange={(e) => customOnChange("details", e.target.value)}
            value={data.details}
          ></textarea>

          <input
            onChange={(e) => customOnChange("name", e.target.value)}
            type="text"
            placeholder="Name"
            value={data.name}
          />
          <input
            onChange={(e) => customOnChange("email", e.target.value)}
            type="text"
            placeholder="Email*"
            value={data.email}
          />
          <input
            onChange={(e) => customOnChange("phone", e.target.value)}
            type="text"
            placeholder="Phone"
            value={data.phone}
          />
          <input
            onChange={(e) => customOnChange("city", e.target.value)}
            type="text"
            placeholder="City*"
            value={data.city}
          />
          <input
            onChange={(e) => customOnChange("state", e.target.value)}
            type="text"
            placeholder="State*"
            value={data.state}
          />
          <input
            onChange={(e) => customOnChange("zip", e.target.value)}
            type="text"
            placeholder="ZIP*"
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
            onChange={(e) => customOnChange("is_special", e.target.value)}
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
            onClick={() => setData(defaultState)}
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
              onClick={handlePostJob}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostService;
