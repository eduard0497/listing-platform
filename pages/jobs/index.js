import React from "react";
import AllListingsGeneral from "../../components/RoutedComponents/AllListingsGeneral";

function GeneralForJobs() {
  return (
    <AllListingsGeneral
      title="Job Listings"
      amountOfItemsToDisplay={30}
      linkToPushTo="/jobs/"
      jobs={true}
      areWithoutImage={true}
    />
  );
}

export default GeneralForJobs;
