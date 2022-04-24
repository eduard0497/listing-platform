import React from "react";
import styles from "../../styles/Components/Popup.module.css";

function Popup({ infoForUser, showInfoForUser, setShowInfoForUser }) {
  return (
    <>
      {showInfoForUser ? (
        <div className={styles.popup_container}>
          <div className={styles.popup_container_inner_box}>
            <h1>{infoForUser}</h1>
            <button onClick={(e) => setShowInfoForUser(false)}>CLOSE</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Popup;
