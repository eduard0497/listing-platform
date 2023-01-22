import React, { useState } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../components/Reusable/Popup";
import { useRouter } from "next/router";
import {
  _ring_loader_color,
  _ring_loader_size,
} from "../components/UsefulFunctions/globalVariables";

const defaultState = {
  email: "",
  password: "",
};

function AdminSignIn() {
  const router = useRouter();
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const checkSubmission = () => {
    if (!data.email.length || !data.password.length) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else {
      return true;
    }
  };

  const handleLogin = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.msg) {
          setInfoForUser(data.msg);
          setShowInfoForUser(true);
        } else {
          sessionStorage.setItem("admin_id", data.adminInfo[0].admin_id);
          sessionStorage.setItem(
            "access_token",
            data.adminInfo[0].access_token
          );
          setData(defaultState);

          setTimeout(async () => {
            await router.push("/admin-dashboard");
            window.location.reload();
          }, 800);
        }
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
        <h1>ADMIN SIGN IN</h1>
        <div className={styles.form_box_fields}>
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
              onClick={handleLogin}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
