import React, { useState } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../Reusable/Popup";

const defaultState = {
  oldPassword: "",
  newPassword: "",
  repeatedPassword: "",
};

function UpdatePassword() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const checkSubmission = () => {
    if (
      !data.oldPassword.length ||
      !data.newPassword.length ||
      !data.repeatedPassword.length
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else if (data.newPassword != data.repeatedPassword) {
      setInfoForUser("Passwords do not match");
      setShowInfoForUser(true);
      return false;
    } else if (data.newPassword.length < 8) {
      setInfoForUser("Password needs to be more than 8 characters");
      setShowInfoForUser(true);
      return false;
    } else {
      return true;
    }
  };

  const handleUpdatePassword = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);
    //
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/update-user-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
        access_token: sessionStorage.getItem("access_token"),
        old_password: data.oldPassword,
        new_password: data.newPassword,
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

  //
  return (
    <div className={styles.form_parent_container}>
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />
      <div className={styles.form_box}>
        <h1>UPDATE PASSWORD</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                oldPassword: e.target.value,
              }))
            }
            type="password"
            placeholder="Old Password"
            value={data.oldPassword}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                newPassword: e.target.value,
              }))
            }
            type="password"
            placeholder="New Password (Min: 8)"
            value={data.newPassword}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                repeatedPassword: e.target.value,
              }))
            }
            type="password"
            placeholder="Repeat the password"
            value={data.repeatedPassword}
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
              onClick={handleUpdatePassword}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
