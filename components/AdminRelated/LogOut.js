import React from "react";
import { useRouter } from "next/router";

function LogOut() {
  const router = useRouter();
  const logOut = () => {
    sessionStorage.clear();
    setTimeout(async () => {
      await router.push("/");
      window.location.reload();
    }, 800);
  };
  return (
    <div>
      <button onClick={logOut}>Sign Out</button>
    </div>
  );
}

export default LogOut;
