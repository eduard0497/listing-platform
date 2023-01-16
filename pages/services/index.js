import React from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Services from "../../components/RoutedComponents/Services";

function GeneralForServices() {
  return (
    <>
      <PageHeader
        title="Services | GorcKa.us"
        description="Services"
        content="Services - GorcKa.us"
        iconLink="/logo/gorcka_logo.jpeg"
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
