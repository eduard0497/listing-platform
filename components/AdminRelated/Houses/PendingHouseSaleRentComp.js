import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function PendingHouseSaleRentComp({ listing, sale, rent, getAll }) {
  //
  const ID = listing.id;
  const userPosted = listing.user_posted;
  const type = listing.type;
  const timestamp = new Date(listing.timestamp).toLocaleString();
  const is_special = listing.is_special.toString();
  const images = listing.images;
  //
  const [title, setTitle] = useState(listing.title);
  const [beds, setBeds] = useState(listing.beds);
  const [baths, setBaths] = useState(listing.baths);
  const [total_area, setTotal_area] = useState(listing.total_area);
  const [price, setPrice] = useState(listing.price);
  const [details, setDetails] = useState(listing.details);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [zip, setZip] = useState(listing.zip);
  const [name, setName] = useState(listing.name);
  const [phone, setPhone] = useState(listing.phone);
  //
  const [duration, setDuration] = useState("");
  // const [stripeLink, setStripeLink] = useState("");
  //

  const updateListing = async () => {
    if (sale) {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-house-for-sale`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            //
            id: ID,
            title: title,
            beds: beds,
            baths: baths,
            total_area: total_area,
            price: price,
            details: details,
            city: city,
            state: state,
            zip: zip,
            name: name,
            phone: phone,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          getAll();
          alert(info.msg);
        });
    } else if (rent) {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-update-house-for-rent`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            //
            id: ID,
            title: title,
            beds: beds,
            baths: baths,
            total_area: total_area,
            price: price,
            frequency: listing.frequency,
            details: details,
            city: city,
            state: state,
            zip: zip,
            name: name,
            phone: phone,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          getAll();
          alert(info.msg);
        });
    }
  };

  const wait = async () => {
    if (sale) {
      fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-wait-house-for-sale`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            id: ID,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          getAll();
          alert(data.msg);
        });
    } else if (rent) {
      fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-wait-house-for-rent`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            id: ID,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          getAll();
          alert(data.msg);
        });
    }
  };
  //
  const approve = async () => {
    if (sale) {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-approve-house-for-sale`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            //
            id: ID,
            title: title,
            beds: beds,
            baths: baths,
            total_area: total_area,
            price: price,
            details: details,
            city: city,
            state: state,
            zip: zip,
            name: name,
            phone: phone,
            duration: duration,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          getAll();
          alert(info.msg);
        });
    } else if (rent) {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-approve-house-for-rent`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: sessionStorage.getItem("admin_id"),
            access_token: sessionStorage.getItem("access_token"),
            //
            id: ID,
            title: title,
            beds: beds,
            baths: baths,
            total_area: total_area,
            price: price,
            frequency: listing.frequency,
            details: details,
            city: city,
            state: state,
            zip: zip,
            name: name,
            phone: phone,
            duration: duration,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          getAll();
          alert(info.msg);
        });
    }
  };

  const reject = () => {
    if (sale) {
      customReject("admin-reject-house-for-sale");
    } else if (rent) {
      customReject("admin-reject-house-for-rent");
    }
  };
  const customReject = (endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/${endpoint}`, {
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
  //

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
          <h3>beds:</h3>
          <input
            type="text"
            defaultValue={beds}
            onChange={(e) => setBeds(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>baths:</h3>
          <input
            type="text"
            defaultValue={baths}
            onChange={(e) => setBaths(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>area:</h3>
          <input
            type="text"
            defaultValue={total_area}
            onChange={(e) => setTotal_area(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>price:</h3>
          <input
            type="text"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {listing.frequency && (
          <div className={styles.pending_info_input}>
            <h3>frequency: {listing.frequency}</h3>
          </div>
        )}
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
          <h3>name:</h3>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
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
        <button className={styles.admin_update_button} onClick={updateListing}>
          Update Listing
        </button>
        <button className={styles.admin_ready_button} onClick={wait}>
          Tell the customer to pay
        </button>
        <h3>Status: {listing.status}</h3>
        <input
          type="text"
          placeholder="Expires in..."
          onChange={(e) => setDuration(e.target.value)}
        />
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

export default PendingHouseSaleRentComp;
