import React, { useState, useEffect } from "react";
import styles from "../../styles/Components/GeneralForm.module.css";
import RingLoader from "react-spinners/RingLoader";
import Popup from "../Reusable/Popup";
import { BsUpload } from "react-icons/bs";

//
const defaultState = {
  title: "",
  type: "",
  beds: "",
  baths: "",
  total_area: "",
  price: "",
  details: ``,
  city: "",
  state: "",
  zip: "",
  name: "",
  phone: "",
  images: [],
  is_special: "",
};

function PostHouseForSale() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [infoForUser, setInfoForUser] = useState("");
  const [showInfoForUser, setShowInfoForUser] = useState(false);
  const [houseTypes, setHouseTypes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-house-types`)
      .then((response) => response.json())
      .then((info) => {
        if (info.msg) {
          console.log(info.msg);
        } else if (isMounted) {
          setHouseTypes(info.allHouseTypes);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const checkSubmission = () => {
    if (
      !data.title.length ||
      !data.type.length ||
      !data.city.length ||
      !data.state.length ||
      !data.zip.length ||
      !data.name.length ||
      !data.images.length ||
      !data.phone.length
    ) {
      setInfoForUser("Please fill out the form properly");
      setShowInfoForUser(true);
      return false;
    } else {
      return true;
    }
  };

  const handlePostHouseForSale = async () => {
    if (!checkSubmission()) {
      return;
    }
    setLoading(true);
    //
    let cloudinaryLinks = [];

    for (let i = 0; i < data.images.length; i++) {
      let imageForm = new FormData();
      imageForm.append("file", data.images[i]);
      imageForm.append("upload_preset", "gorckaimages");
      await fetch("https://api.cloudinary.com/v1_1/gorcka-com/image/upload", {
        method: "POST",
        body: imageForm,
      })
        .then((res) => res.json())
        .then((data) => cloudinaryLinks.push(data.secure_url));
    }
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-post-house-for-sale`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
          access_token: sessionStorage.getItem("access_token"),
          title: data.title,
          type: data.type,
          beds: data.beds,
          baths: data.baths,
          total_area: data.total_area,
          price: data.price,
          details: data.details,
          city: data.city,
          state: data.state,
          zip: data.zip,
          name: data.name,
          phone: data.phone,
          images: cloudinaryLinks,
          is_special: data.is_special,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        setInfoForUser(info.msg);
        setShowInfoForUser(true);
        setData(defaultState);
      });

    setLoading(false);
  };

  //
  return (
    <div className={styles.form_parent_container}>
      <Popup
        infoForUser={infoForUser}
        showInfoForUser={showInfoForUser}
        setShowInfoForUser={setShowInfoForUser}
      />
      <div className={styles.form_box}>
        <h1>Post House for Sale</h1>
        <div className={styles.form_box_fields}>
          {/*  */}
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            type="text"
            placeholder="Title"
            value={data.title}
          />
          <select
            name="houseType"
            id="houseType"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
            value={data.type}
          >
            <option value="">Select House Type</option>
            {houseTypes.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                beds: e.target.value,
              }))
            }
            type="text"
            placeholder="Beds"
            value={data.beds}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                baths: e.target.value,
              }))
            }
            type="text"
            placeholder="Baths"
            value={data.baths}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                total_area: e.target.value,
              }))
            }
            type="text"
            placeholder="Total Area (sqft)"
            value={data.total_area}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
            type="text"
            placeholder="Price"
            value={data.price}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Details"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                details: e.target.value,
              }))
            }
            value={data.details}
          ></textarea>
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                city: e.target.value,
              }))
            }
            type="text"
            placeholder="City"
            value={data.city}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                state: e.target.value,
              }))
            }
            type="text"
            placeholder="State"
            value={data.state}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                zip: e.target.value,
              }))
            }
            type="text"
            placeholder="Zip"
            value={data.zip}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            type="text"
            placeholder="Contact Name"
            value={data.name}
          />
          <input
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
            type="text"
            placeholder="Contact Phone"
            value={data.phone}
          />

          <div className={styles.image_upload_container}>
            <label htmlFor="images" className="logo_and_text_together">
              <BsUpload />{" "}
              {`Upload up to ${process.env.NEXT_PUBLIC_MAX_ALLOWED_IMAGES_FOR_HOUSE_SELLING} images`}
            </label>
            {data.images.length != 0 ? (
              <h5>
                Files selected:{" "}
                {data.images.length >
                parseInt(
                  process.env.NEXT_PUBLIC_MAX_ALLOWED_IMAGES_FOR_HOUSE_SELLING
                )
                  ? "Exceeds the limit"
                  : data.images.length}
              </h5>
            ) : null}
            <input
              type="file"
              id="images"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  images: e.target.files,
                }))
              }
              multiple
              accept="image/*"
            />
          </div>
          <select
            name="listingType"
            id="listingType"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_special: e.target.value,
              }))
            }
            value={data.is_special}
          >
            <option value="">Choose Listing Option</option>
            <option value={true}>SPECIAL</option>
            <option value={false}>Regular</option>
          </select>
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
              onClick={handlePostHouseForSale}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostHouseForSale;
