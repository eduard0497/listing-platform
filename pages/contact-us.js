import React, { useState, useEffect } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../components/Reusable/Popup";

const defaultState = {
  name: "",
  email: "",
  details: ``,
};

function ContactUs() {
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);
  const [infoToSubmit, setInfoToSubmit] = useState(defaultState);

  useEffect(() => {
    if (
      !sessionStorage.getItem("user_id") ||
      !sessionStorage.getItem("access_token")
    ) {
      setUserExists(false);
    } else {
      setUserExists(true);
    }
  }, []);

  if (!userExists) {
    return null;
  }

  const submitForm = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        access_token: sessionStorage.getItem("access_token"),
        name: infoToSubmit.name,
        email: infoToSubmit.email,
        details: infoToSubmit.details,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInfoForUser(data.msg);
        setShowInfoForUser(true);
        setInfoToSubmit(defaultState);
      });
    setLoading(false);
  };

  return (
    <div className={styles.form_parent_container}>
      <PageHeader
        title="Contact Us | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />

      <div className={styles.form_box}>
        <h1>Contact Us</h1>
        <div className={styles.form_box_fields}>
          <input
            type="text"
            placeholder="Your Name"
            value={infoToSubmit.name}
            onChange={(e) =>
              setInfoToSubmit((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Your Email"
            value={infoToSubmit.email}
            onChange={(e) =>
              setInfoToSubmit((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Details"
            value={infoToSubmit.details}
            onChange={(e) =>
              setInfoToSubmit((prevState) => ({
                ...prevState,
                details: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className={styles.form_box_control_buttons}>
          <button
            className={styles.general_form_clear_button}
            onClick={(e) => setInfoToSubmit(defaultState)}
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
              onClick={submitForm}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
