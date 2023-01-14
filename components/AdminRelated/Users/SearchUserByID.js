import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import { shortenText } from "../../UsefulFunctions/helperFunctions";

function SearchUserByID() {
  const [loading, setLoading] = useState(false);
  const [userIDToSearch, setUserIDToSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [bannerAds, setBannerAds] = useState([]);
  const [sideAds, setSideAds] = useState([]);
  const [videoAds, setVideoAds] = useState([]);
  const [runningAds, setRunningAds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [sellingHouses, setSellingHouses] = useState([]);
  const [rentingHouses, setRentingHouses] = useState([]);
  const [sellingVehicles, setSellingVehicles] = useState([]);
  const [rentingVehicles, setRentingVehicles] = useState([]);
  // 
  const [totalEarnedFromUser, setTotalEarnedFromUser] = useState(0)

  const getUserData = () => {
    setLoading(true);
    if (!userIDToSearch) {
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-specific-user`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        userID: userIDToSearch,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          alert(data.msg);
        } else {
          let allListings = data.allListingsPayments;
          let tempTotalEarnedFromUser = 0;
          allListings.forEach(item => tempTotalEarnedFromUser = tempTotalEarnedFromUser + (item.payment_amount / 100))
          setTotalEarnedFromUser(tempTotalEarnedFromUser)
          setUserData(data.userData);
          setBannerAds(
            mergePaymentInfosWithListingsAndSort(allListings, data.bannerAds)
          );
          setSideAds(
            mergePaymentInfosWithListingsAndSort(allListings, data.sideAds)
          );
          setVideoAds(
            mergePaymentInfosWithListingsAndSort(allListings, data.videoAds)
          );
          setRunningAds(
            mergePaymentInfosWithListingsAndSort(allListings, data.runningAds)
          );
          setJobs(mergePaymentInfosWithListingsAndSort(allListings, data.jobs));
          setServices(
            mergePaymentInfosWithListingsAndSort(allListings, data.services)
          );
          setSellingHouses(
            mergePaymentInfosWithListingsAndSort(
              allListings,
              data.sellingHouses
            )
          );
          setRentingHouses(
            mergePaymentInfosWithListingsAndSort(
              allListings,
              data.rentingHouses
            )
          );
          setSellingVehicles(
            mergePaymentInfosWithListingsAndSort(
              allListings,
              data.sellingVehicles
            )
          );
          setRentingVehicles(
            mergePaymentInfosWithListingsAndSort(
              allListings,
              data.rentingVehicles
            )
          );
        }
        setLoading(false);
      });
  };

  const clearSearch = () => {
    setUserIDToSearch("");
    setUserData([]);
    setBannerAds([]);
    setSideAds([]);
    setVideoAds([]);
    setRunningAds([]);
    setJobs([]);
    setServices([]);
    setSellingHouses([]);
    setRentingHouses([]);
    setSellingVehicles([]);
    setRentingVehicles([]);
  };

  const mergePaymentInfosWithListingsAndSort = (
    listingsWithPaymentInfo,
    arrayToMergePaymentInfoTo
  ) => {
    arrayToMergePaymentInfoTo.sort((a, b) => a.status - b.status);
    arrayToMergePaymentInfoTo.forEach((item) => {
      let foundIndex = listingsWithPaymentInfo.findIndex(
        (listing) => listing.id == item.id
      );
      item.stripe_session_id =
        listingsWithPaymentInfo[foundIndex].stripe_session_id;
      item.payment_intent = listingsWithPaymentInfo[foundIndex].payment_intent;
      item.payment_amount = listingsWithPaymentInfo[foundIndex].payment_amount / 100;
      item.payment_status = listingsWithPaymentInfo[foundIndex].payment_status;
    });

    return arrayToMergePaymentInfoTo;
  };

  return (
    <div>
      <div className={styles.admin_links}>
        <input
          type="number"
          placeholder="Search User By ID"
          value={userIDToSearch}
          onChange={(e) => setUserIDToSearch(e.target.value)}
        />
        {loading ? (
          <button className={styles.admin_update_button}>Loading...</button>
        ) : (
          <button className={styles.admin_update_button} onClick={getUserData}>
            SEARCH
          </button>
        )}

        <button className={styles.admin_delete_button} onClick={clearSearch}>
          CLEAR
        </button>
      </div>

      <UserInfo userData={userData} />
      <UserVideoAds arrayToDisplay={videoAds} />
      <UserBannerAds arrayToDisplay={bannerAds} />
      <UserSideAds arrayToDisplay={sideAds} />
      <UserRunningAds arrayToDisplay={runningAds} />
      {/*  */}
      <UserJobs arrayToDisplay={jobs} />
      <UserServices arrayToDisplay={services} />
      <UserSellingHouses arrayToDisplay={sellingHouses} />
      <UserRentingHouses arrayToDisplay={rentingHouses} />
      <UserSellingVehicles arrayToDisplay={sellingVehicles} />
      <UserRentingVehicles arrayToDisplay={rentingVehicles} />
    </div>
  );
}

export default SearchUserByID;

const UserInfo = ({ userData }) => {
  return (
    <>
      {userData.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Banned</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((item) => (
                <tr key={item.user_id} className={styles.table_rows}>
                  <td>{item.user_id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.is_banned ? "BANNED!!!" : "Not Banned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserVideoAds = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>Videos</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Video Link</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>
                    <a href={item.video_link}>Video{"\n"}</a>
                  </td>
                  <td>{item.status}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>{item.expires ?  new Date(item.expires).toLocaleDateString() : null}</td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserBannerAds = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>Banner Ads</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Ad Image Link</th>
                <th>Status</th>
                <th>Redirect Link</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>
                    <a href={item.ad_link}>Image{"\n"}</a>
                  </td>
                  <td>{item.status}</td>
                  <td>{item.redirect_link}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>{item.expires ?  new Date(item.expires).toLocaleDateString() : null}</td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserSideAds = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>Side Ads</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Ad Image Link</th>
                <th>Status</th>
                <th>Redirect Link</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>
                    <a href={item.ad_link}>Image{"\n"}</a>
                  </td>
                  <td>{item.status}</td>
                  <td>{item.redirect_link}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>{item.expires ?  new Date(item.expires).toLocaleDateString() : null}</td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserRunningAds = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>Running Ads</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{item.text}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>{item.expires ?  new Date(item.expires).toLocaleDateString() : null}</td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserJobs = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>Jobs</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Is Special</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{shortenText(item.title, 20)}</td>
                  <td>{item.status}</td>
                  <td>{item.is_special.toString()}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    {item.expires
                      ? new Date(item.expires).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserServices = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>Services</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Is Special</th>
                <th>Images</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{shortenText(item.title, 20)}</td>
                  <td>{item.status}</td>
                  <td>{item.is_special.toString()}</td>
                  <td>
                    {item.images.map((image, index) => {
                      return (
                        <a key={index} href={image}>
                          Image{"\n"}
                        </a>
                      );
                    })}
                  </td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    {item.expires
                      ? new Date(item.expires).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserSellingHouses = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>
                  Selling Houses
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Is Special</th>
                <th>Images</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{shortenText(item.title, 20)}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>{item.is_special.toString()}</td>
                  <td>
                    {item.images.map((image, index) => {
                      return (
                        <a key={index} href={image}>
                          Image{"\n"}
                        </a>
                      );
                    })}
                  </td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    {item.expires
                      ? new Date(item.expires).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserRentingHouses = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>
                  Renting Houses
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Is Special</th>
                <th>Images</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{shortenText(item.title, 20)}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>{item.is_special.toString()}</td>
                  <td>
                    {item.images.map((image, index) => {
                      return (
                        <a key={index} href={image}>
                          Image{"\n"}
                        </a>
                      );
                    })}
                  </td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    {item.expires
                      ? new Date(item.expires).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserSellingVehicles = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>
                  Selling Vehicles
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Car</th>
                <th>Status</th>
                <th>Is Special</th>
                <th>Images</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{shortenText(item.title, 20)}</td>
                  <td>{item.type}</td>
                  <td>
                    {item.make +
                      " " +
                      item.model +
                      " " +
                      item.year +
                      " " +
                      item.color}
                  </td>
                  <td>{item.status}</td>
                  <td>{item.is_special.toString()}</td>
                  <td>
                    {item.images.map((image, index) => {
                      return (
                        <a key={index} href={image}>
                          Image{"\n"}
                        </a>
                      );
                    })}
                  </td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    {item.expires
                      ? new Date(item.expires).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const UserRentingVehicles = ({ arrayToDisplay }) => {
  return (
    <>
      {arrayToDisplay.length != 0 ? (
        <div className={styles.table_outer_for_scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_title_of_the_row}>
                  Renting Vehicles
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Car</th>
                <th>Status</th>
                <th>Is Special</th>
                <th>Images</th>
                <th>Timestamp</th>
                <th>Expires</th>
                <th>Stripe Session</th>
                <th>Payment Intent</th>
                <th>Payment Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {arrayToDisplay.map((item) => (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{shortenText(item.title, 20)}</td>
                  <td>{item.type}</td>
                  <td>
                    {item.make +
                      " " +
                      item.model +
                      " " +
                      item.year +
                      " " +
                      item.color}
                  </td>
                  <td>{item.status}</td>
                  <td>{item.is_special.toString()}</td>
                  <td>
                    {item.images.map((image, index) => {
                      return (
                        <a key={index} href={image}>
                          Image{"\n"}
                        </a>
                      );
                    })}
                  </td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    {item.expires
                      ? new Date(item.expires).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.stripe_session_id}</td>
                  <td>{item.payment_intent}</td>
                  <td>{item.payment_amount}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};
