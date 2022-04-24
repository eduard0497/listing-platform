import React, { useState } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../components/Reusable/Popup";

const defaultState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  access_key: "",
};

function AdminRegister() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForAdmin, setInfoForAdmin] = useState("");
  const [showInfoForAdmin, setShowInfoForAdmin] = useState(false);

  const checkSubmission = () => {
    if (
      !data.first_name.length ||
      !data.password.length ||
      !data.email.length ||
      !data.access_key.length ||
      !data.last_name.length
    ) {
      setInfoForAdmin("Please fill out the form properly");
      setShowInfoForAdmin(true);
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/register-admin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        access_key: data.access_key,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setData(defaultState);
        setInfoForAdmin(data.msg);
        setShowInfoForAdmin(true);
      });

    setLoading(false);
  };

  return (
    <div className={styles.form_parent_container}>
      <Popup
        infoForUser={infoForAdmin}
        showInfoForUser={showInfoForAdmin}
        setShowInfoForUser={setShowInfoForAdmin}
      />
      <div className={styles.form_box}>
        <h1>ADMIN REGISTER</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                first_name: e.target.value,
              }))
            }
            type="text"
            placeholder="First Name"
            value={data.first_name}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                last_name: e.target.value,
              }))
            }
            type="text"
            placeholder="Last Name"
            value={data.last_name}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({ ...prevState, email: e.target.value }))
            }
            type="text"
            placeholder="Email"
            value={data.email}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
            type="password"
            placeholder="Password"
            value={data.password}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                access_key: e.target.value,
              }))
            }
            type="password"
            placeholder="Access Key"
            value={data.access_key}
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
              onClick={handleRegister}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
