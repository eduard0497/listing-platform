import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function PendingJobs({ listing, getAll }) {
  const ID = listing.id;
  const userPosted = listing.user_posted;
  const type = listing.type;
  const timestamp = new Date(listing.timestamp).toLocaleString();
  const is_special = listing.is_special.toString();

  const [title, setTitle] = useState(listing.title);
  const [overview, setOverview] = useState(listing.overview);
  const [requirements, setRequirements] = useState(listing.requirements);
  const [salary, setSalary] = useState(listing.salary);
  const [name, setName] = useState(listing.name);
  const [email, setEmail] = useState(listing.email);
  const [phone, setPhone] = useState(listing.phone);
  const [address, setAddress] = useState(listing.address);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [zip, setZip] = useState(listing.zip);
  //
  // const [stripeLink, setStripeLink] = useState("");

  //   status

  const updateListing = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-job`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: ID,
        title: title,
        type: type,
        overview: overview,
        requirements: requirements,
        salary: salary,
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        alert(info.msg);
      });
  };

  const wait = async () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-wait-job`, {
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
        alert(data.msg);
      });
  };

  const approve = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-approve-job`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: ID,
        title: title,
        type: type,
        overview: overview,
        requirements: requirements,
        salary: salary,
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        alert(info.msg);
      });
  };

  const reject = () => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-reject-job`, {
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
        alert(info.msg);
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
  //       alert(info.msg);
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
          <h3>overview:</h3>
          <textarea
            cols="30"
            rows="10"
            defaultValue={overview}
            onChange={(e) => setOverview(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.pending_info_input}>
          <h3>requirements:</h3>
          <textarea
            cols="30"
            rows="10"
            defaultValue={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.pending_info_input}>
          <h3>salary:</h3>
          <input
            type="text"
            defaultValue={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
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
          <h3>address:</h3>
          <input
            type="text"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
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
        <button className={styles.admin_update_button} onClick={updateListing}>
          Update Listing
        </button>
        <button className={styles.admin_ready_button} onClick={wait}>
          Tell the customer to pay
        </button>
        <h3>Status: {listing.status}</h3>
        <button className={styles.admin_approve_button} onClick={approve}>
          Approve
        </button>
        <button className={styles.admin_delete_button} onClick={reject}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default PendingJobs;
