import React from "react";
import Jobs from "../../components/RoutedComponents/Jobs";

function GeneralForJobs() {
  return (
    <Jobs
      title="Job Listings"
      amountOfItemsToDisplay={30}
      linkToPushTo="/jobs/"
    />
  );
}

export default GeneralForJobs;
