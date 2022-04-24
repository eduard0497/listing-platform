import React, { useState } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../Reusable/Popup";
import { BsUpload } from "react-icons/bs";

function PostVideoAd() {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);

  //   sra implementationy anem!!!!!!!!!!!!!!!

  const handlePostVideoAd = async () => {
    setLoading(true);
    if (video.length != 0) {
      let videoToUpload = video[0];
      let videoLinkToSave;
      let videoForm = new FormData();
      videoForm.append("file", videoToUpload);
      videoForm.append("upload_preset", "gorckavideos");
      //
      await fetch("https://api.cloudinary.com/v1_1/gorcka-com/video/upload", {
        method: "POST",
        body: videoForm,
      })
        .then((res) => res.json())
        .then((data) => {
          videoLinkToSave = data.secure_url;
        });
      //

      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-video-ad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            access_token: sessionStorage.getItem("access_token"),
            video_link: videoLinkToSave,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setInfoForUser(data.msg);
          setShowInfoForUser(true);
        });
    } else {
      setInfoForUser("No Video has been selected");
      setShowInfoForUser(true);
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
        <h1>Post Video Ad here</h1>
        <div className={styles.form_box_fields}>
          <div className={styles.image_upload_container}>
            {/*  */}
            <label htmlFor="video" className="logo_and_text_together">
              <BsUpload /> Upload a Video
            </label>
            {video.length != 0 ? <h5>Video has been selected</h5> : null}
            <input
              type="file"
              id="video"
              onChange={(e) => {
                console.log("mrav on change");
                setVideo(e.target.files);
              }}
              accept="video/*"
            />

            {/*  */}
          </div>
          <div className={styles.form_box_control_buttons}>
            {/* <button
              className={styles.general_form_clear_button}
              onClick={() => {
                console.log("mrav");
                setVideo([]);
              }}
            >
              RESET
            </button> */}

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
                onClick={handlePostVideoAd}
              >
                SUBMIT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostVideoAd;
