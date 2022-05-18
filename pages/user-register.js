import React, { useState } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../components/Reusable/Popup";
import { useRouter } from "next/router";
import Link from "next/link";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function UserRegister() {
  const router = useRouter();
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const checkSubmission = () => {
    //   sranq stugem
    if (
      !data.firstName.length ||
      !data.lastName.length ||
      !data.email.length ||
      !data.password.length
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else if (data.password.length < 8) {
      setInfoForUser("Password must be greater than 8 chracters");
      setShowInfoForUser(true);
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);
    //
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name:
          data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1),
        last_name:
          data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1),
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInfoForUser(data.msg);
        setShowInfoForUser(true);
      });
    //
    setLoading(false);
  };

  //   sax takinnery nayem

  return (
    <div className={styles.form_parent_container}>
      <PageHeader
        title="User Register | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/favicon.ico"
      />
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />
      <div className={styles.form_box}>
        <h1>JOIN US</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }))
            }
            type="text"
            placeholder="First Name"
            value={data.firstName}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }))
            }
            type="text"
            placeholder="Last Name"
            value={data.lastName}
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
            placeholder="Password (Min: 8)"
            value={data.password}
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
        <div className={styles.form_box_row_with_two_items}>
          <Link href="/user-signin" passHref>
            Have an Account? Sign in instead
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
