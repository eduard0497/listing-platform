import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function PendingVehicleSaleRentComp({ listing, sale, rent, getAll }) {
  const ID = listing.id;
  const userPosted = listing.user_posted;
  const type = listing.type;
  const timestamp = new Date(listing.timestamp).toLocaleString();
  const is_special = listing.is_special.toString();
  const images = listing.images;

  const [title, setTitle] = useState(listing.title);
  const [make, setMake] = useState(listing.make);
  const [model, setModel] = useState(listing.model);
  const [year, setYear] = useState(listing.year);
  const [color, setColor] = useState(listing.color);
  const [transmission, setTransmission] = useState(listing.transmission);
  const [mileage, setMileage] = useState(listing.mileage);
  const [price, setPrice] = useState(listing.price);
  const [details, setDetails] = useState(listing.details);
  const [name, setName] = useState(listing.name);
  const [phone, setPhone] = useState(listing.phone);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [zip, setZip] = useState(listing.zip);

  //
  const [duration, setDuration] = useState("");
  // const [stripeLink, setStripeLink] = useState("");
  //
  const wait = async () => {
    if (sale) {
      fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-wait-vehicle-for-sale`,
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
          console.log(data.msg);
        });
    } else if (rent) {
      fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-wait-vehicle-for-rent`,
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
          console.log(data.msg);
        });
    }
  };
  //
  const approve = async () => {
    if (sale) {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-approve-vehicle-for-sale`,
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
            make: make,
            model: model,
            year: year,
            color: color,
            transmission: transmission,
            mileage: mileage,
            details: details,
            price: price,
            name: name,
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
    } else if (rent) {
      await fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-approve-vehicle-for-rent`,
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
            make: make,
            model: model,
            year: year,
            color: color,
            transmission: transmission,
            mileage: mileage,
            details: details,
            price: price,
            frequency: listing.frequency,
            name: name,
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
    }
  };

  const reject = () => {
    if (sale) {
      customReject("admin-reject-vehicle-for-sale");
    } else if (rent) {
      customReject("admin-reject-vehicle-for-rent");
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
          <h3>make:</h3>
          <input
            type="text"
            defaultValue={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>model:</h3>
          <input
            type="text"
            defaultValue={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>year:</h3>
          <input
            type="text"
            defaultValue={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>color:</h3>
          <input
            type="text"
            defaultValue={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>transmission:</h3>
          <input
            type="text"
            defaultValue={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          />
        </div>
        <div className={styles.pending_info_input}>
          <h3>mileage:</h3>
          <input
            type="text"
            defaultValue={mileage}
            onChange={(e) => setMileage(e.target.value)}
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

export default PendingVehicleSaleRentComp;
