import React from "react";
import PageHeader from "../../components/Reusable/PageHeader";
import Jobs from "../../components/RoutedComponents/Jobs";

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
        amountOfItemsToDisplay={30}
        linkToPushTo="/jobs/"
      />
    </>
  );
}

export default GeneralForJobs;
