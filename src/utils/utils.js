import moment from "moment/moment";

export function makeRandomId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function generateVariables(keyValObj) {
  const finalObj = {};
  Object.entries(keyValObj).map(([key, val]) => {
    finalObj[key] = Array.isArray(val) ? val.map((v) => v.id) : val;
  });
  return finalObj;
}

export function formatTimestampToDate(timestamp, format='DD MMM YYYY') {
  return moment(+timestamp).format(format)
}

export const fetchVal = (keyArr, dataObj) => {
  if (!dataObj) {
    return null;
  }
  let extractedVal = { ...dataObj };
  const keyLen = keyArr.length;
  let isValid = true;
  let pos = 0;
  while (isValid && pos < keyLen) {
    if (Array.isArray(keyArr[pos])) {
      if (!extractedVal || !extractedVal.length) {
        isValid = false;
        extractedVal = null;
        break;
      }
      extractedVal = extractedVal.map((v) => v[keyArr[pos][0]]);
      break;
    } else if (!extractedVal[keyArr[pos]]) {
      isValid = false;
      extractedVal = null;
      break;
    }
    extractedVal = extractedVal[keyArr[pos]];
    pos += 1;
  }
  return extractedVal;
};
