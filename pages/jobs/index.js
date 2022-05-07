import React from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Jobs from "../../components/RoutedComponents/Jobs";

function GeneralForJobs() {
  return (
    <>
      <PageHeader
        title="Jobs | GorcKa.com"
        description="Gorc Ka Listing Platform Homepage"
        content="Home Page For GorcKa.com"
        iconLink="/favicon.ico"
      />
      <Jobs
        title="Job Listings"
        amountOfItemsToDisplay={30}
        linkToPushTo="/jobs/"
      />
    </>
  );
}

export default GeneralForJobs;
