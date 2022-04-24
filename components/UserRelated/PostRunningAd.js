import React, { useState } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../Reusable/Popup";

function PostRunningAd() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const handlePostRunningAd = async () => {
    setLoading(true);

    if (!text.length) {
      setInfoForUser("No text has been entered");
      setShowInfoForUser(true);
    } else {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-running-ad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            access_token: sessionStorage.getItem("access_token"),
            text: text,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          setInfoForUser(info.msg);
          setShowInfoForUser(true);
          setText("");
        });
    }

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
        <h1>Post Running Sentence Ad</h1>
        <div className={styles.form_box_fields}>
          {/*  */}
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Runnng sentence here..."
            value={text}
          />
        </div>

        <div className={styles.form_box_control_buttons}>
          <button
            className={styles.general_form_clear_button}
            onClick={(e) => setText("")}
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
              onClick={handlePostRunningAd}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostRunningAd;
