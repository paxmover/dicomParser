/**
 * Parses a TM formatted string into a javascript object with properties for hours, minutes, seconds and fractionalSeconds
 * @param {string} time - a string in the TM VR format
 * @param {boolean} [validate] - true if an exception should be thrown if the date is invalid
 * @returns {*} javascript object with properties for hours, minutes, seconds and fractionalSeconds or undefined if no element or data.  Missing fields are set to undefined
 */
export default function parseTM (time, validate) {
  // must at least have HH
  if (time.length < 2) {
    throw new Error(`invalid TM ${time}`);
  }

  // 0123456789
  // HHMMSS.FFFFFF
  const hh = parseInt(time.substring(0, 2), 10);
  const mm = time.length >= 4 ? parseInt(time.substring(2, 4), 10) : undefined;
  const ss = time.length >= 6 ? parseInt(time.substring(4, 6), 10) : undefined;
  const ffffff = time.length >= 8 ? parseInt(time.substring(7, 13), 10) : undefined;

  if (validate) {
    if ((isNaN(hh)) ||
      (mm !== undefined && isNaN(mm)) ||
      (ss !== undefined && isNaN(ss)) ||
      (ffffff !== undefined && isNaN(ffffff)) ||
      (hh < 0 || hh > 23) ||
      (mm && (mm < 0 || mm > 59)) ||
      (ss && (ss < 0 || ss > 59)) ||
      (ffffff && (ffffff < 0 || ffffff > 999999))) {
      throw new Error(`invalid TM ${time}`);
    }
  }

  return {
    hours: hh,
    minutes: mm,
    seconds: ss,
    fractionalSeconds: ffffff
  };
}
