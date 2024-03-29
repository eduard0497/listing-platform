import React, { useState } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import {
  _ring_loader_color,
  _ring_loader_size,
} from "../UsefulFunctions/globalVariables";
import Popup from "../Reusable/Popup";
import { BsUpload } from "react-icons/bs";

function PostSideAd() {
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [redirectLink, setRedirectLink] = useState("");

  const handlePostSideAd = async () => {
    setLoading(true);
    //
    if (selectedImages.length != 0) {
      let cloudinaryLink;
      let imageForm = new FormData();
      imageForm.append("file", selectedImages[0]);
      imageForm.append("upload_preset", "sideImageAds");
      await fetch("https://api.cloudinary.com/v1_1/gorcka-com/image/upload", {
        method: "POST",
        body: imageForm,
      })
        .then((res) => res.json())
        .then((data) => {
          cloudinaryLink = data.secure_url;
        });

      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-side-ad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            access_token: sessionStorage.getItem("access_token"),
            redirect_link: redirectLink.trim(),
            ad_link: cloudinaryLink,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          setRedirectLink("");
          setSelectedImages([]);
          setInfoForUser(info.msg);
          setShowInfoForUser(true);
        });
    } else {
      setInfoForUser("Please select an image first");
      setShowInfoForUser(true);
    }
    //
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
        <h1>Post Small Image Ad</h1>
        <div className={styles.form_box_fields}>
          <input
            onChange={(e) => setRedirectLink(e.target.value)}
            type="text"
            placeholder="Paste redirect link here if there is one"
            value={redirectLink}
          />
          <div className={styles.image_upload_container}>
            <label htmlFor="images" className="logo_and_text_together">
              <BsUpload /> Upload Image
            </label>
            {selectedImages.length != 0 ? (
              <h5>Image has been selected</h5>
            ) : null}
            <input
              type="file"
              id="images"
              onChange={(e) => setSelectedImages(e.target.files)}
              accept="image/*"
            />
          </div>
        </div>
        <div className={styles.form_box_control_buttons}>
          {/* <button
            className={styles.general_form_clear_button}
            onClick={(e) => setData(defaultState)}
          >
            CLEAR
          </button> */}

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
              onClick={handlePostSideAd}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostSideAd;
