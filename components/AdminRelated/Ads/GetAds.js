import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import ReactPlayer from "react-player";
import PendingAds from "./PendingAds";
import ApprAndArchivedAds from "./ApprAndArchivedAds";

// serveri  mej functionnery dzem -> archive, delete
// bayc hima arandznacnem componentneri mej
// funkcianeri mec masy poxvelua arden

function GetAds() {
  const [allPendingBannerAds, setPendingBannerAds] = useState([]);
  const [allApprovedBannerAds, setApprovedBannerAds] = useState([]);
  const [allArchivedBannerAds, setArchivedBannerAds] = useState([]);
  const [allPendingRunning, setPendingRunning] = useState([]);
  const [allApprovedRunning, setApprovedRunning] = useState([]);
  const [allArchivedRunning, setArchivedRunning] = useState([]);
  const [allPendingSide, setPendingSide] = useState([]);
  const [allApprovedSide, setApprovedSide] = useState([]);
  const [allArchivedSide, setArchivedSide] = useState([]);
  const [allPendingVideo, setPendingVideo] = useState([]);
  const [allApprovedVideo, setApprovedVideo] = useState([]);
  const [allArchivedVideo, setArchivedVideo] = useState([]);

  const [showPendingBanners, setShowPendingBanners] = useState(false);
  const [showApprovedBanners, setShowApprovedBanners] = useState(false);
  const [showArchivedBanners, setShowArchivedBanners] = useState(false);
  const [showPendingSides, setShowPendingSides] = useState(false);
  const [showApprovedSides, setShowApprovedSides] = useState(false);
  const [showArchivedSides, setShowArchivedSides] = useState(false);
  const [showPendingVideos, setShowPendingVideos] = useState(false);
  const [showApprovedVideos, setShowApprovedVideos] = useState(false);
  const [showArchivedVideos, setShowArchivedVideos] = useState(false);
  const [showPendingRunning, setShowPendingRunning] = useState(false);
  const [showApprovedRunning, setShowApprovedRunning] = useState(false);
  const [showArchivedRunning, setShowArchivedRunning] = useState(false);

  const getAll = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/admin-get-all-ads`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: sessionStorage.getItem("admin_id"),
        access_token: sessionStorage.getItem("access_token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else {
          setPendingBannerAds(data.pendingBannerAds);
          setApprovedBannerAds(data.approvedBannerAds);
          setArchivedBannerAds(data.archivedBannerAds);
          setPendingRunning(data.pendingRunningAds);
          setApprovedRunning(data.approvedRunningAds);
          setArchivedRunning(data.archivedRunningAds);
          setPendingSide(data.pendingSideAds);
          setApprovedSide(data.approvedSideAds);
          setArchivedSide(data.archivedSideAds);
          setPendingVideo(data.pendingVideoAds);
          setApprovedVideo(data.approvedVideoAds);
          setArchivedVideo(data.archivedVideoAds);
        }
      });
  };

  const buttonStyle = {
    padding: "5px",
  };

  return (
    <div className={styles.admin_pending_container}>
      <div>
        <button onClick={getAll}>Get All</button>
        <h5>
          Overall TOTAL:{" "}
          {allPendingBannerAds.length +
            allApprovedBannerAds.length +
            allArchivedBannerAds.length +
            allPendingRunning.length +
            allApprovedRunning.length +
            allArchivedRunning.length +
            allPendingSide.length +
            allApprovedSide.length +
            allArchivedSide.length +
            allPendingVideo.length +
            allApprovedVideo.length +
            allArchivedVideo.length}
        </h5>
      </div>

      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowPendingBanners(!showPendingBanners)}
        style={buttonStyle}
      >
        Pending Banners | {allPendingBannerAds.length}
      </button>
      {showPendingBanners &&
        allPendingBannerAds.map((item) => {
          return (
            <PendingAds key={item.id} ad={item} banner={true} getAll={getAll} />
          );
        })}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowPendingSides(!showPendingSides)}
        style={buttonStyle}
      >
        Pending Side Ads | {allPendingSide.length}
      </button>
      {showPendingSides &&
        allPendingSide.map((item) => {
          return (
            <PendingAds key={item.id} ad={item} side={true} getAll={getAll} />
          );
        })}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowPendingVideos(!showPendingVideos)}
        style={buttonStyle}
      >
        Pending Video Ads | {allPendingVideo.length}
      </button>
      {showPendingVideos &&
        allPendingVideo.map((item) => {
          return (
            <PendingAds key={item.id} ad={item} video={true} getAll={getAll} />
          );
        })}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowPendingRunning(!showPendingRunning)}
        style={buttonStyle}
      >
        Pending Running | {allPendingRunning.length}
      </button>
      {showPendingRunning &&
        allPendingRunning.map((item) => {
          return (
            <PendingAds
              key={item.id}
              ad={item}
              running={true}
              getAll={getAll}
            />
          );
        })}
      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowApprovedBanners(!showApprovedBanners)}
        style={buttonStyle}
      >
        Approved Banners | {allApprovedBannerAds.length}
      </button>
      {showApprovedBanners && (
        <ApprAndArchivedAds
          ads={allApprovedBannerAds}
          banner={true}
          approved={true}
          getAll={getAll}
        />
      )}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowArchivedBanners(!showArchivedBanners)}
        style={buttonStyle}
      >
        Archived Banners | {allArchivedBannerAds.length}
      </button>
      {showArchivedBanners && (
        <ApprAndArchivedAds
          ads={allArchivedBannerAds}
          banner={true}
          archived={true}
          getAll={getAll}
        />
      )}

      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowApprovedSides(!showApprovedSides)}
        style={buttonStyle}
      >
        Approved Sides | {allApprovedSide.length}
      </button>
      {showApprovedSides && (
        <ApprAndArchivedAds
          ads={allApprovedSide}
          side={true}
          approved={true}
          getAll={getAll}
        />
      )}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowArchivedSides(!showArchivedSides)}
        style={buttonStyle}
      >
        Archived Sides | {allArchivedSide.length}
      </button>
      {showArchivedSides && (
        <ApprAndArchivedAds
          ads={allArchivedSide}
          side={true}
          archived={true}
          getAll={getAll}
        />
      )}

      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowApprovedVideos(!showApprovedVideos)}
        style={buttonStyle}
      >
        Approved Videos | {allApprovedVideo.length}
      </button>
      {showApprovedVideos && (
        <ApprAndArchivedAds
          ads={allApprovedVideo}
          video={true}
          approved={true}
          getAll={getAll}
        />
      )}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowArchivedVideos(!showArchivedVideos)}
        style={buttonStyle}
      >
        Archived Videos | {allArchivedVideo.length}
      </button>
      {showArchivedVideos && (
        <ApprAndArchivedAds
          ads={allArchivedVideo}
          video={true}
          archived={true}
          getAll={getAll}
        />
      )}

      <h3>----------------------------------------------</h3>

      <button
        onClick={() => setShowApprovedRunning(!showApprovedRunning)}
        style={buttonStyle}
      >
        Approved Running | {allApprovedRunning.length}
      </button>
      {showApprovedRunning && (
        <ApprAndArchivedAds
          ads={allApprovedRunning}
          running={true}
          approved={true}
          getAll={getAll}
        />
      )}

      {/* ---------------------------------------------- */}

      <button
        onClick={() => setShowArchivedRunning(!showArchivedRunning)}
        style={buttonStyle}
      >
        Archived Running | {allArchivedRunning.length}
      </button>
      {showArchivedRunning && (
        <ApprAndArchivedAds
          ads={allArchivedRunning}
          running={true}
          archived={true}
          getAll={getAll}
        />
      )}
    </div>
  );
}

export default GetAds;
