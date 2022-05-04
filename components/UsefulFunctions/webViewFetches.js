import {
  sortArrayInDescendingOrder,
  connectArraysAndSortInDescending,
} from "./helperFunctions";

export async function getAllLiveAds() {
  let videoAds = [];
  let bannerAds = [];
  let sideAds = [];
  let runningAds = [];

  await fetch(
    `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-all-ads-for-web-view`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.msg) {
        console.log(data.msg);
      } else {
        videoAds = data.videoAds;
        bannerAds = data.bannerAds;
        sideAds = data.sideAds;
        runningAds = data.runningAds;
      }
    });

  return { videoAds, bannerAds, sideAds, runningAds };
}

export async function getTypesForHouses() {
  let arrayToReturn = [];
  await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-house-types`)
    .then((response) => response.json())
    .then((data) => {
      arrayToReturn = data.allHouseTypes;
    });
  return arrayToReturn;
}

export async function getTypesForJobs() {
  let arrayToReturn = [];
  await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-job-categories`)
    .then((response) => response.json())
    .then((data) => {
      arrayToReturn = data.allJobCategories;
    });
  return arrayToReturn;
}

export async function getAllJobs() {
  let sortedArray = [];

  await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-jobs`)
    .then((response) => response.json())
    .then((data) => {
      if (data.msg) {
        console.log(data.msg);
      } else {
        sortedArray = connectArraysAndSortInDescending(
          data.specialJobs,
          data.regularJobs
        );
      }
    });

  return sortedArray;
}

export async function getSpecialJobs() {
  let sortedArray = [];
  await fetch(
    `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-jobs?is_special=true`
  )
    .then((response) => response.json())
    .then((data) => {
      sortedArray = sortArrayInDescendingOrder(data.specialJobs);
    });
  return sortedArray;
}

export async function getAllHousesForSale() {
  let sortedArray = [];

  await fetch(`${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-houses-for-sale`)
    .then((response) => response.json())
    .then((data) => {
      if (data.msg) {
        console.log(data.msg);
      } else {
        sortedArray = connectArraysAndSortInDescending(
          data.specialHousesForSale,
          data.regularHousesForSale
        );
      }
    });
  return sortedArray;
}

export async function getSpecialHousesForSale() {
  let sortedArray = [];
  await fetch(
    `${process.env.NEXT_PUBLIC_LINK_TO_FETCH}/get-houses-for-sale?is_special=true`
  )
    .then((response) => response.json())
    .then((data) => {
      sortedArray = sortArrayInDescendingOrder(data.specialHousesForSale);
    });
  return sortedArray;
}
