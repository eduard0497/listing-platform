import React, { useState } from "react";
import styles from "../styles/Components/GeneralForm.module.css";
import PageHeader from "../components/Reusable/PageHeader";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../components/Reusable/Popup";
import { useRouter } from "next/router";
import Link from "next/link";

const defaultState = {
  email: "",
  password: "",
};

function UserSignIn() {
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
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-login`, {
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
          sessionStorage.setItem("user_id", data.userData[0].user_id);
          sessionStorage.setItem("access_token", data.userData[0].access_token);
          setData(defaultState);
          setTimeout(async () => {
            await router.push("/user-dashboard");
            window.location.reload();
          }, 800);
        }
      });

    setLoading(false);
  };

  return (
    <div className={styles.form_parent_container}>
      <PageHeader
        title="Sign In | GorcKa.com"
        description="Gorc Ka Listing Platform Sign In"
        content="Sign In For GorcKa.com"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />
      <div className={styles.form_box}>
        <h1>SIGN IN</h1>
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
                color={process.env.NEXT_PUBLIC_GENERAL_FORM_CLIP_LOADER_COLOR}
                loading={loading}
                size={20}
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
        <div className={styles.form_box_row_with_two_items}>
          <Link href="/forgot-password" passHref>
            Forgot Password?
          </Link>
          <Link href="/user-register" passHref>
            No Account? Join us instead
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserSignIn;
