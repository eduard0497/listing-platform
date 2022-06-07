import React from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Services from "../../components/RoutedComponents/Services";

function GeneralForServices() {
  return (
    <>
      <PageHeader
        title="Jobs | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/favicon.ico"
      />
      <div id="scrollTo"></div>
      <Services
        title="Services"
        amountOfItemsToDisplay={30}
        linkToPushTo="/services/"
      />
    </>
  );
}

export default GeneralForServices;
