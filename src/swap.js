function cloneArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default function swap(arr, indexA, indexB) {
  const clone = cloneArray(arr);
  if (arr.length <= 1) {
    return clone;
  }
  let temp = arr[indexA];
  clone[indexA] = arr[indexB];
  clone[indexB] = temp;

  return clone;
}
