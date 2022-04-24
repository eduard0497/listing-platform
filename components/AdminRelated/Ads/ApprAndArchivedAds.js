import React from "react";
import styles from "../../../styles/AdminDashboard.module.css";

function ApprAndArchivedAds({
  ads,
  banner,
  side,
  video,
  running,
  approved,
  archived,
  getAll,
}) {
  //
  const archive = (id) => {
    if (banner) {
      customArchive(id, "admin-archive-banner-ad");
    } else if (side) {
      customArchive(id, "admin-archive-side-ad");
    } else if (video) {
      customArchive(id, "admin-archive-video-ad");
    } else if (running) {
      customArchive(id, "admin-archive-running-ad");
    }
  };
  const deleteAd = (id) => {
    if (banner) {
      customDeleteAd(id, "admin-delete-banner-ad");
    } else if (side) {
      customDeleteAd(id, "admin-delete-side-ad");
    } else if (video) {
      customDeleteAd(id, "admin-delete-video-ad");
    } else if (running) {
      customDeleteAd(id, "admin-delete-running-ad");
    }
  };
  const customArchive = (adID, endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: adID,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        console.log(info.msg);
      });
  };

  const customDeleteAd = (adID, endpoint) => {
    fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
        //
        id: adID,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        getAll();
        console.log(info.msg);
      });
  };

  if (!running) {
    return (
      <div className={styles.table_outer_for_scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Posted</th>
              {video ? null : <th>Redirect Link</th>}
              {video ? <th>Video Link</th> : <th>Image Link</th>}
              <th>Date Added</th>
              <th>Expires</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((item) => {
              return (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{item.user_added}</td>
                  {video ? null : <td>{item.redirect_link}</td>}
                  <td>
                    {video ? (
                      <a href={item.video_link}>Image</a>
                    ) : (
                      <a href={item.ad_link}>Image</a>
                    )}
                  </td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                  <td>{new Date(item.expires).toLocaleDateString()}</td>

                  {approved && (
                    <td>
                      <button
                        value={item.id}
                        className={styles.admin_delete_button}
                        onClick={(e) => archive(e.target.value)}
                      >
                        ARCHIVE
                      </button>
                    </td>
                  )}
                  {archived && (
                    <td>
                      <button
                        value={item.id}
                        className={styles.admin_delete_button}
                        onClick={(e) => deleteAd(e.target.value)}
                      >
                        DELETE
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className={styles.table_outer_for_scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Posted</th>
              <th>Text</th>
              <th>Expires</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((item) => {
              return (
                <tr key={item.id} className={styles.table_rows}>
                  <td>{item.id}</td>
                  <td>{item.user_added}</td>
                  <td>{item.text}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                  <td>{new Date(item.expires).toLocaleDateString()}</td>

                  {approved && (
                    <td>
                      <button
                        value={item.id}
                        className={styles.admin_delete_button}
                        onClick={(e) => archive(e.target.value)}
                      >
                        ARCHIVE
                      </button>
                    </td>
                  )}
                  {archived && (
                    <td>
                      <button
                        value={item.id}
                        className={styles.admin_delete_button}
                        onClick={(e) => deleteAd(e.target.value)}
                      >
                        DELETE
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApprAndArchivedAds;
