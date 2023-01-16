import React from "react";
import PageHeader from "../components/Reusable/PageHeader";

function ErrorPage() {
  return (
    <div>
      <PageHeader
        title="404 | GorcKa.us"
        description="Gorc Ka Listing Platform 404"
        content="Home Page For GorcKa.us"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <h1>Ooops...</h1>
    </div>
  );
}

export default ErrorPage;
