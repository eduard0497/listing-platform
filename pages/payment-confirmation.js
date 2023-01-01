import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles_loading from "../styles/Components/Layout.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";

function PaymentConfirmation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session_id } = router.query;

  const updatePaymentInAllListings = () => {
    if (session_id) {
      fetch(
        `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/user-update-stripe-payment-id-after-checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            access_token: sessionStorage.getItem("access_token"),
            stripe_session_id: session_id,
          }),
        }
      )
        .then((res) => res.json())
        .then((info) => {
          console.log(info.msg);
          setTimeout(async () => {
            await router.push("/user-dashboard");
            window.location.reload();
          }, 5000);
        });
    } else {
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    updatePaymentInAllListings();

    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles_loading.layout_loading}>
          <PropagateLoader
            color={process.env.NEXT_PUBLIC_CLIP_LOADER_COLOR}
            loading={loading}
            size={20}
          />
        </div>
      ) : (
        <div className={styles_loading.payment_confirmation}>
          <h1>Thank you for your payment</h1>
          <h2>Will be redirecting to dashboard shortly...</h2>
        </div>
      )}
    </>
  );
}

export default PaymentConfirmation;
