import React, { useEffect, useState } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import RingLoader from "react-spinners/RingLoader";
import {
  _ring_loader_color,
  _ring_loader_size,
  _user_min_password_count,
} from "../components/UsefulFunctions/globalVariables";
import Popup from "../components/Reusable/Popup";
import { useRouter } from "next/router";
import Link from "next/link";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

function UserRegister() {
  const router = useRouter();
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [checkBoxClicked, setCheckBoxClicked] = useState(false);

  const checkSubmission = () => {
    if (
      !data.firstName.length ||
      !data.lastName.length ||
      !data.email.length ||
      !data.password.length ||
      !data.confirmedPassword.length
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else if (data.password.length < _user_min_password_count) {
      setInfoForUser(
        `Password must be greater than ${_user_min_password_count} chracters`
      );
      setShowInfoForUser(true);
      return false;
    } else if (data.password != data.confirmedPassword) {
      setInfoForUser("Passwords have to match!");
      setShowInfoForUser(true);
      return false;
    } else if (
      data.password.includes(" ") ||
      data.confirmedPassword.includes(" ")
    ) {
      setInfoForUser("Passwords may not contain SPACES!");
      setShowInfoForUser(true);
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
    //
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name:
          data.firstName.charAt(0).toUpperCase() +
          data.firstName.slice(1).toLowerCase(),
        last_name:
          data.lastName.charAt(0).toUpperCase() +
          data.lastName.slice(1).toLowerCase(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInfoForUser(data.msg);
        setShowInfoForUser(true);
        setData(defaultState);
      });
    //
    setLoading(false);
  };

  useEffect(() => {
    if (data.password != data.confirmedPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [data.password, data.confirmedPassword]);

  //   sax takinnery nayem

  return (
    <div className={styles.form_parent_container}>
      <PageHeader
        title="Register User | GorcKa.us"
        description="Register User"
        content="Register User - GorcKa.us"
        iconLink="/logo/gorcka_logo.jpeg"
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
            placeholder={`Password (Min: ${_user_min_password_count})`}
            value={data.password}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                confirmedPassword: e.target.value,
              }))
            }
            type="password"
            placeholder="Confirm Password"
            value={data.confirmedPassword}
          />
          {data.password.length != 0 ? (
            <div className={styles.matching_passwords}>
              {passwordsMatch ? (
                <p className={styles.matching_passwords_match}>
                  Passwords Match
                </p>
              ) : (
                <p className={styles.matching_passwords_no_match}>
                  Passwords do not match
                </p>
              )}
            </div>
          ) : null}
          <div className={styles.flex_container}>
            <input
              type="checkbox"
              checked={checkBoxClicked}
              onChange={(e) => setCheckBoxClicked(e.target.checked)}
            />
            <p>
              I have read and agree to{" "}
              <Link href="/terms-and-conditions">
                <a>terms & conditions</a>
              </Link>
              .
            </p>
          </div>
        </div>

        <div className={styles.form_box_control_buttons}>
          <button
            className={styles.general_form_clear_button}
            onClick={(e) => {
              setData(defaultState);
              setPasswordsMatch(false);
            }}
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
            <>
              {checkBoxClicked ? (
                <button
                  className={styles.general_form_submit_button}
                  onClick={handleRegister}
                >
                  SUBMIT
                </button>
              ) : (
                <button
                  className={styles.general_form_disabled_button}
                  disabled={true}
                >
                  SUBMIT
                </button>
              )}
            </>
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
