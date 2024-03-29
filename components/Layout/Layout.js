import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "../../styles/Components/Layout.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import ScrollingText from "../ScrollingText";
import TopAds from "../TopAds";
import SideAds from "../SideAds";
import {
  _propagate_loader_color,
  _propagate_loader_size,
} from "../UsefulFunctions/globalVariables";
import { getAllLiveAds } from "../UsefulFunctions/webViewFetches";
import Link from "next/link";
import Search from "../Search";

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
      route.pathname == "/user-signin" ||
      route.pathname == "/user-register" ||
      route.pathname == "/user-dashboard" ||
      route.pathname == "/admin-login" ||
      route.pathname == "/admin-register" ||
      route.pathname == "/forgot-password" ||
      route.pathname == "/contact-us" ||
      route.pathname == "/prices" ||
      route.pathname == "/privacy-policy" ||
      route.pathname == "/terms-and-conditions" ||
      route.pathname == "/payment-confirmation" ||
      route.pathname.includes("/jobs/") ||
      route.pathname.includes("/services/") ||
      route.pathname.includes("/for-sale/houses/") ||
      route.pathname.includes("/for-rent/houses/") ||
      route.pathname.includes("/for-sale/vehicles/") ||
      route.pathname.includes("/for-rent/vehicles/")
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
        setLoading(false);
      }
    })();

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
                color={_propagate_loader_color}
                loading={loading}
                size={_propagate_loader_size}
              />
            </div>
          ) : (
            <div className={styles.layout_container}>
              <Navbar />

              <div className={styles.navbar_sublinks_container}>
                <Link href="/jobs#scrollTo">
                  <a>jobs</a>
                </Link>
                <Link href="/for-sale#scrollTo">
                  <a>buy</a>
                </Link>
                <Link href="/for-rent#scrollTo">
                  <a>rent</a>
                </Link>
                <Link href="/services#scrollTo">
                  <a>services</a>
                </Link>
              </div>

              <Search />

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
