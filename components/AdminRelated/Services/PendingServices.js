import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function PendingServices({ listing, getAll }) {
  const ID = listing.id;
  const userPosted = listing.user_posted;
  const type = listing.type;
  const timestamp = new Date(listing.timestamp).toLocaleString();
  const is_special = listing.is_special.toString();
  const images = listing.images;

  const [title, setTitle] = useState(listing.title);
  const [details, setDetails] = useState(listing.details);
  const [name, setName] = useState(listing.name);
  const [email, setEmail] = useState(listing.email);
  const [phone, setPhone] = useState(listing.phone);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [zip, setZip] = useState(listing.zip);
  //
  const [duration, setDuration] = useState("");
  // const [stripeLink, setStripeLink] = useState("");

  //   status

  const wait = async () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-wait-service`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        id: ID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getAll();
        console.log(data.msg);
      });
  };

  const approve = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-approve-service`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_id: sessionStorage.getItem("admin_id"),
          access_token: sessionStorage.getItem("access_token"),
          //
          id: ID,
          title: title,
          type: type,
          details: details,
          name: name,
          email: email,
          phone: phone,
          city: city,
          state: state,
          zip: zip,
          duration: duration,
        }),
      }
    )
      .then((res) => res.json())
      .then((info) => {
        getAll();
        console.log(info.msg);
      });
  };

  const reject = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-reject-service`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        id: ID,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        console.log(info.msg);
      });
  };

  // const sendLinkToPay = async () => {
  //   await fetch(
  //     `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-send-stripe-link`,
  //     {
  //       method: "post",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         admin_id: sessionStorage.getItem("admin_id"),
  //         access_token: sessionStorage.getItem("access_token"),
  //         user_id_to_send_email: userPosted,
  //         stripe_link: stripeLink,
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((info) => {
  //       console.log(info.msg);
  //     });
  // };

  return (
    <div className={styles.admin_pending_container_item}>
      <div className={styles.admin_pending_container_item_left}>
        <div className={styles.pending_info_input}>
          <h3>listing id: {ID}</h3>
        </div>
        <div className={styles.pending_info_input}>
          <h3>user posted: {userPosted}</h3>
        </div>
        <div className={styles.pending_info_input}>
          <h3>title:</h3>
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>type: {type}</h3>
        </div>

        <div className={styles.pending_info_input}>
          <h3>details:</h3>
          <textarea
            cols="30"
            rows="10"
            defaultValue={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.pending_info_input}>
          <h3>name:</h3>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>email:</h3>
          <input
            type="text"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>phone:</h3>
          <input
            type="text"
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.pending_info_input}>
          <h3>city:</h3>
          <input
            type="text"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>state:</h3>
          <input
            type="text"
            defaultValue={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>zip:</h3>
          <input
            type="text"
            defaultValue={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>timestamp: {new Date(timestamp).toLocaleString()}</h3>
        </div>
        <div className={styles.pending_info_input}>
          <h3>is special: {is_special.toString()}</h3>
        </div>
        <div className={styles.pending_info_input}>
          <h3>images:</h3>
          <div>
            {images.map((image) => (
              <a href={image} target="_blank" key={image} rel="noreferrer">
                <img src={image} alt="house" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.admin_pending_container_item_right}>
        {/* {listing.is_special ? (
          <div>
            <input
              type="text"
              placeholder="Stripe Link"
              onChange={(e) => setStripeLink(e.target.value)}
            />
            <button onClick={sendLinkToPay}>Send Email to User</button>
          </div>
        ) : null} */}
        <h3>Status: {listing.status}</h3>
        <button className={styles.admin_update_button} onClick={wait}>
          Tell the customer to pay
        </button>
        <input
          type="text"
          placeholder="Expires in..."
          onChange={(e) => setDuration(e.target.value)}
        />
        <button className={styles.admin_update_button} onClick={approve}>
          Approve
        </button>
        <button className={styles.admin_delete_button} onClick={reject}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default PendingServices;
