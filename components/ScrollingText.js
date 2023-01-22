import React, { useState, useEffect } from "react";
import styles from "../styles/Components/ScrollingText.module.css";

function ScrollingText({ data }) {
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    if (data.length != 0) {
      setSentence(data[0].text);
    } else {
      setSentence("Create an account and place your advertisement here!");
    }
  }, [data]);

  return (
    <div className={styles.scrolling_text_container}>
      <h3>{sentence}</h3>
    </div>
  );
}

export default ScrollingText;
