import React from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Jobs from "../../components/RoutedComponents/Jobs";
import { _amount_of_items_to_display_in_routed_components } from "../../components/UsefulFunctions/globalVariables";

function GeneralForJobs() {
  return (
    <>
      <PageHeader
        title="Jobs | GorcKa.us"
        description="Jobs"
        content="Jobs - GorcKa.us"
        iconLink="/logo/gorcka_logo.jpeg"
      />
      <div id="scrollTo"></div>
      <Jobs
        title="Job Listings"
        amountOfItemsToDisplay={_amount_of_items_to_display_in_routed_components}
        linkToPushTo="/jobs/"
      />
    </>
  );
}

export default GeneralForJobs;
