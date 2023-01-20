import React, { useState, useEffect } from "react";
import styles from "../../styles/Components/Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscSignIn } from "react-icons/vsc";
import { FaUserPlus } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import Image from "next/image";

function Navbar() {
  const iconSize = "20px";
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [burgerToggle, setBurgerToggle] = useState(false);

  const closeBurger = () => {
    setBurgerToggle(false);
  };

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
      closeBurger();
      await router.push("/");
      window.location.reload();
    }, 800);
  };

  return (
    <div className={styles.navbar_container}>
      <div
        className={styles.burger}
        onClick={() => setBurgerToggle(!burgerToggle)}
      >
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>

      <div className={styles.logo}>
        <Link href="/">
          <a onClick={closeBurger}>
            <Image
              src="/logo/gorcka_logo.jpeg"
              alt="logo"
              width="65"
              height="65"
            />
          </a>
        </Link>
      </div>

      {/* <div className={styles.search_box}>
        <button className={styles.btn_search}>
          <FaSearch size={iconSize} />
        </button>
        <input
          type="text"
          className={styles.input_search}
          placeholder="Type to Search..."
        />
      </div> */}

      <div
        className={
          burgerToggle ? styles.navbar_links_active : styles.navbar_links
        }
      >
        {userLoggedIn ? (
          <div className={styles.navbar_links_container}>
            <Link href="/user-dashboard">
              <a onClick={closeBurger}>
                <RiUserSettingsLine size={iconSize} />
                dashboard
              </a>
            </Link>
            <Link href="/contact-us">
              <a onClick={closeBurger}>
                <BiSupport size={iconSize} />
                contact us
              </a>
            </Link>
            <button onClick={handleLogOut}>
              <>
                <GoSignOut size={iconSize} />
                sign out
              </>
            </button>
          </div>
        ) : (
          <div className={styles.navbar_links_container}>
            <Link href="/user-signin">
              <a onClick={closeBurger}>
                <VscSignIn size={iconSize} />
                sign in
              </a>
            </Link>
            <Link href="/user-register">
              <a onClick={closeBurger}>
                <FaUserPlus size={iconSize} />
                join us
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
