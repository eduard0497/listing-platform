import React, { useState, useEffect } from "react";
import styles from "../styles/Components/ScrollingText.module.css";

function ScrollingText({ data }) {
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    if (data.length != 0) {
      setSentence(data[0].text);
    } else {
      setSentence("Your Advertisement Here!");
    }
  }, [data]);

  return (
    <div className={styles.scrolling_text_container}>
      <h3>{sentence}</h3>
    </div>
  );
}

export default ScrollingText;
