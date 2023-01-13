import React, { useState, useEffect } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../Reusable/Popup";
import { jobCategories } from "../UsefulFunctions/jobCategories";

const defaultState = {
  title: "",
  type: "",
  overview: ``,
  requirements: ``,
  salary: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  is_special: "",
};

function PostJob() {
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
      !data.phone.length ||
      !data.is_special
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else if (!data.phone.length && !data.email.length) {
      setInfoForUser("Please include either email or phone.");
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

    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        access_token: sessionStorage.getItem("access_token"),

        // 

        // title: "RECEPTIONIST NEEDED - Պահանջվում է Ընդունարանի Աշխատակից",
        // type: "Admin/Office",
        // overview: "An Accounting office in Glendale is hiring for a receptionist position. Position is full-time and minimum 2 year prior experience is a must.",
        // requirements: "Skills and responsibilities: Communication skills in person and via telephone, multitasking in a busy office environment. The candidate must be highly organized and responsible. Language: The candidate MUST be fluent in English and Armenian. Please email your resume to: carine@glendaleagi.com",
        // salary: "15000",
        // name: "Khoren",
        // email: "khorhov@gmail.com",
        // phone: "818-747-4109",
        // address: "416 Porter St",
        // city: "Glendale",
        // state: "CA",
        // zip: "91205",
        // is_special: true,

        // 

        title: data.title,
        type: data.type,
        overview: data.overview,
        requirements: data.requirements,
        salary: data.salary,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
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
        <h1>Post Job Listing</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) => customOnChange("title", e.target.value)}
            type="text"
            placeholder="Title*"
            value={data.title}
          />

          <select
            name="jobCategories"
            id="jobCategories"
            onChange={(e) => customOnChange("type", e.target.value)}
            value={data.type}
          >
            <option value="">Select Job Type*</option>
            {jobCategories.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          <textarea
            cols="30"
            rows="10"
            placeholder="Overview"
            onChange={(e) => customOnChange("overview", e.target.value)}
            value={data.overview}
          ></textarea>
          <textarea
            cols="30"
            rows="10"
            placeholder="Requirements"
            onChange={(e) => customOnChange("requirements", e.target.value)}
            value={data.requirements}
          ></textarea>

          <input
            onChange={(e) => customOnChange("salary", e.target.value)}
            type="text"
            placeholder="Salary"
            value={data.salary}
          />
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
            onChange={(e) => customOnChange("address", e.target.value)}
            type="text"
            placeholder="Address"
            value={data.address}
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
                color={process.env.NEXT_PUBLIC_GENERAL_FORM_CLIP_LOADER_COLOR}
                loading={loading}
                size={20}
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

export default PostJob;
