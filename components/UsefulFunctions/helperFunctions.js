export function shortenText(text, length) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
}

export function sortArrayInDescendingOrder(array) {
  return array.sort((a, b) => b.id - a.id);
}

export function connectArraysAndSortInDescending(array1, array2) {
  let arrayToReturn = [];
  arrayToReturn = array1;
  arrayToReturn = [...arrayToReturn, ...array2];
  arrayToReturn.sort((a, b) => b.id - a.id);
  return arrayToReturn;
}
