import React from "react";
import styles from "../styles/Components/Layout.module.css";
import { FaSuitcase, FaSearch } from "react-icons/fa";
import {
  _suitcase_icon_size,
  _suitcase_icon_color,
  _search_icon_size,
} from "./UsefulFunctions/globalVariables";

function Search() {
  return (
    <div className={styles.navbar_bottom_border}>
      <span className={styles.suitcase_icon}>
        <FaSuitcase size={_suitcase_icon_size} color={_suitcase_icon_color} />
      </span>
    </div>
  );
}

export default Search;

/*

<div className={styles.search_box}>
        <button className={styles.btn_search}>
          <FaSearch size={_search_icon_size} />
        </button>
        <input
          type="text"
          className={styles.input_search}
          placeholder="Type to Search..."
        />
      </div>

	

*/
