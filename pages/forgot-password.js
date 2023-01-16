import React, { useState } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../components/Reusable/Popup";

const defaultState = {
  email: "",
  name: "",
};

function ForgotPassword() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const checkSubmission = () => {
    if (!data.email.length || !data.name.length) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else {
      return true;
    }
  };

  const handleForgotPassword = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-forgot-password`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          first_name: data.name,
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
  return (
    <div className={styles.form_parent_container}>
      <PageHeader
        title="User Restore Password | GorcKa.us"
        description="User Restore Password"
        content="User Restore Password - GorcKa.us"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />
      <div className={styles.form_box}>
        <h1>PASSWORD RESET</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) =>
              setData((prevState) => ({ ...prevState, email: e.target.value }))
            }
            type="text"
            placeholder="Email you used to register"
            value={data.email}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            type="text"
            placeholder="First name you used to register"
            value={data.name}
          />
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
                color={process.env.NEXT_PUBLIC_GENERAL_FORM_CLIP_LOADER_COLOR}
                loading={loading}
                size={20}
              />
            </button>
          ) : (
            <button
              className={styles.general_form_submit_button}
              onClick={handleForgotPassword}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
