import React from "react";
import Head from "next/head";

function PageHeader({ title, description, content, iconLink }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name={description} content={content} />
      <link rel="icon" href="/logo/gorcka_logo.jpeg" />
    </Head>
  );
}

export default PageHeader;
