import React from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Services from "../../components/RoutedComponents/Services";
import { _amount_of_items_to_display_in_routed_components } from "../../components/UsefulFunctions/globalVariables";

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
        amountOfItemsToDisplay={
          _amount_of_items_to_display_in_routed_components
        }
        linkToPushTo="/services/"
      />
    </>
  );
}

export default GeneralForServices;
