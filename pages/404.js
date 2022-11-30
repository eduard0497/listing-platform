import React from "react";
import PageHeader from "../components/Reusable/PageHeader";

function ErrorPage() {
  return (
    <div>
      <PageHeader
        title="404 | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <h1>Ooops...</h1>
    </div>
  );
}

export default ErrorPage;
