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
