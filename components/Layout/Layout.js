import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "../../styles/Components/Layout.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import ScrollingText from "../ScrollingText";
import TopAds from "../TopAds";
import SideAds from "../SideAds";
import { FaSuitcase } from "react-icons/fa";
import { getAllLiveAds } from "../UsefulFunctions/webViewFetches";

function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showContentAdmin, setShowContentAdmin] = useState(false);
  let route = useRouter();

  // fetched variables
  const [video, setVideo] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [runningSentence, setRunningSentence] = useState([]);
  //
  useEffect(() => {
    if (
      route.pathname === "/user-signin" ||
      route.pathname === "/user-register" ||
      route.pathname === "/user-dashboard" ||
      route.pathname === "/admin-login" ||
      route.pathname === "/admin-register" ||
      route.pathname === "/forgot-password" ||
      route.pathname === "/contact-us" ||
      route.pathname === "/prices"
    ) {
      setShowContent(false);
    } else {
      setShowContent(true);
    }

    if (
      sessionStorage.getItem("admin_id") &&
      sessionStorage.getItem("access_token")
    ) {
      setShowContentAdmin(true);
    }
  }, [route]);

  useEffect(async () => {
    let isMounted = true;
    setLoading(true);

    (async () => {
      let returnedAds = await getAllLiveAds();
      if (isMounted) {
        setVideo(returnedAds.videoAds);
        setBannerImages(returnedAds.bannerAds);
        setRightImages(returnedAds.sideAds);
        setRunningSentence(returnedAds.runningAds);
      }
    })();

    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  //
  return (
    <>
      {showContentAdmin ? (
        <>{children}</>
      ) : (
        <>
          {loading ? (
            <div className={styles.layout_loading}>
              <PropagateLoader
                color={process.env.NEXT_PUBLIC_CLIP_LOADER_COLOR}
                loading={loading}
                size={20}
              />
            </div>
          ) : (
            <div className={styles.layout_container}>
              <Navbar />

              <div className={styles.navbar_bottom_border}>
                <span className={styles.suitcase_icon}>
                  <FaSuitcase
                    size="2em"
                    color={process.env.NEXT_PUBLIC_CLIP_LOADER_COLOR}
                  />
                </span>
              </div>

              {showContent ? (
                <>
                  <ScrollingText data={runningSentence} />
                  <TopAds video={video} banners={bannerImages} />
                  <div className={styles.content_and_ads_container}>
                    <div className={styles.content_and_ads_container_children}>
                      {children}
                    </div>
                    <div className={styles.content_and_ads_container_ads}>
                      <SideAds images={rightImages} />
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.children_only}>{children}</div>
              )}

              <Footer />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Layout;

// es meky nayem!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TOP ADS-um el
// await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-top-banner-video`)
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.msg) {
//       console.log(data.msg);
//     } else {
//       setVideo(data.videoAds);
//     }
//   });

// await fetch(
//   `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-top-banner-images`
// )
//   .then((response) => response.json(response))
//   .then((data) => {
//     if (data.msg) {
//       console.log(data.msg);
//     } else {
//       setImages(data.bannerAds);
//     }
//   });

// await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-side-ads`)
//   .then((response) => response.json(response))
//   .then((data) => {
//     if (data.msg) {
//       console.log(data.msg);
//     } else {
//       setRightImages(data.sideAds);
//     }
//   });
//     videoAds
// bannerAds
// sideAds
// runningAds
