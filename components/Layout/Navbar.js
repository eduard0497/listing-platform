import React, { useState, useEffect } from "react";
import styles from "../../styles/Components/Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscSignIn } from "react-icons/vsc";
import { GiArchiveRegister } from "react-icons/gi";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { BiSupport } from "react-icons/bi";

function Navbar() {
  const iconSize = "20px";
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [burgerToggle, setBurgerToggle] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("access_token");
    if (sessionStorage.getItem("admin_id")) {
      sessionStorage.removeItem("admin_id");
    }
    setTimeout(async () => {
      await router.push("/");
      window.location.reload();
    }, 800);
  };

  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_logo_container}>
        <div
          className={styles.burger}
          onClick={() => setBurgerToggle(!burgerToggle)}
        >
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
        <Link href="/">LOGO</Link>
      </div>

      <div
        className={
          burgerToggle ? styles.navbar_links_active : styles.navbar_links
        }
      >
        <div className={styles.navbar_links_container}>
          <Link href="/">jobs</Link>
          <Link href="/">buy</Link>
          <Link href="/">sell</Link>
          <Link href="/">home made food</Link>
        </div>
        {userLoggedIn ? (
          <div className={styles.navbar_links_container}>
            <Link href="/user-dashboard">
              <>
                <RiUserSettingsLine size={iconSize} />
                dashboard
              </>
            </Link>
            <button onClick={handleLogOut}>
              <>
                <GoSignOut size={iconSize} />
                sign out
              </>
            </button>
            <Link href="/">
              <>
                <BiSupport size={iconSize} />
                contact us
              </>
            </Link>
          </div>
        ) : (
          <div className={styles.navbar_links_container}>
            <Link href="/user-signin">
              <>
                <VscSignIn size={iconSize} />
                sign in
              </>
            </Link>
            <Link href="/user-register">
              <>
                <GiArchiveRegister size={iconSize} />
                join us
              </>
            </Link>
            <Link href="/">
              <>
                <BiSupport size={iconSize} />
                contact us
              </>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
