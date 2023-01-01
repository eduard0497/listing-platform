import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import ReactPlayer from "react-player";

function PendingAds({ ad, banner, side, video, running, getAll }) {
  //
  const ID = ad.id;
  const userPosted = ad.user_added;
  const [expires, setExpires] = useState("");
  // const [stripeLink, setStripeLink] = useState("");
  //
  const wait = () => {
    if (banner) {
      customWait("admin-wait-banner-ad");
    } else if (side) {
      customWait("admin-wait-side-ad");
    } else if (video) {
      customWait("admin-wait-video-ad");
    } else if (running) {
      customWait("admin-wait-running-ad");
    }
  };
  const approve = () => {
    if (banner) {
      customApprove("admin-approve-banner-ad");
    } else if (side) {
      customApprove("admin-approve-side-ad");
    } else if (video) {
      customApprove("admin-approve-video-ad");
    } else if (running) {
      customApprove("admin-approve-running-ad");
    }
  };
  const reject = () => {
    if (banner) {
      customReject("admin-reject-banner-ad");
    } else if (side) {
      customReject("admin-reject-side-ad");
    } else if (video) {
      customReject("admin-reject-video-ad");
    } else if (running) {
      customReject("admin-reject-running-ad");
    }
  };
  const customWait = (endpoint) => {
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
      .then((data) => {
        getAll();
        console.log(data.msg);
      });
  };
  
  const customApprove = (endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        id: ID,
        duration: expires,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getAll();
        console.log(data.msg);
      });
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
      .then((data) => {
        getAll();
        console.log(data.msg);
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

  if (banner || side || video) {
    return (
      <div className={styles.admin_pending_container_item}>
        <div className={styles.admin_pending_container_item_left}>
          <div className={styles.pending_info_input}>
            <h3>Ad id: {ID}</h3>
          </div>
          <div className={styles.pending_info_input}>
            <h3>user added: {userPosted}</h3>
          </div>
          {video ? null : (
            <div className={styles.pending_info_input}>
              <h3>redirect link: {ad.redirect_link}</h3>
            </div>
          )}

          <div className={styles.pending_info_input}>
            <h3>timestamp: {new Date(ad.timestamp).toLocaleString()}</h3>
          </div>

          {video ? (
            <div className={styles.pending_info_input}>
              <h3>video:</h3>
              <ReactPlayer
                url={ad.video_link}
                controls
                muted
                width={400}
                height={300}
              />
            </div>
          ) : (
            <div className={styles.pending_info_input}>
              <h3>image:</h3>
              <div>
                <a href={ad.ad_link} target="_blank" rel="noreferrer">
                  <img src={ad.ad_link} alt="advertisement" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className={styles.admin_pending_container_item_right}>
          {/* <div>
            <input
              type="text"
              placeholder="Stripe Link"
              onChange={(e) => setStripeLink(e.target.value)}
            />
            <button onClick={sendLinkToPay}>Send Email to User</button>
          </div> */}
          <h2>Status: {ad.status}</h2>
          <button className={styles.admin_update_button} onClick={wait}>
            Tell the customer to pay
          </button>
          <input
            type="text"
            placeholder="Expires in..."
            onChange={(e) => setExpires(e.target.value)}
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
  } else {
    return (
      <div className={styles.admin_pending_container_item}>
        <div className={styles.admin_pending_container_item_left}>
          <div className={styles.pending_info_input}>
            <h3>listing id: {ad.id}</h3>
          </div>
          <div className={styles.pending_info_input}>
            <h3>user added: {ad.user_added}</h3>
          </div>

          <div className={styles.pending_info_input}>
            <h3>timestamp: {new Date(ad.timestamp).toLocaleString()}</h3>
          </div>

          <div className={styles.pending_info_input}>
            <h3>text: {ad.text}</h3>
          </div>
        </div>

        <div className={styles.admin_pending_container_item_right}>
          {/* <div>
            <input
              type="text"
              placeholder="Stripe Link"
              onChange={(e) => setStripeLink(e.target.value)}
            />
            <button onClick={sendLinkToPay}>Send Email to User</button>
          </div> */}
          <h2>Status: {ad.status}</h2>
          <button className={styles.admin_update_button} onClick={wait}>
            Tell the customer to pay
          </button>
          <input
            type="text"
            placeholder="Expires in..."
            onChange={(e) => setExpires(e.target.value)}
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
}

export default PendingAds;
