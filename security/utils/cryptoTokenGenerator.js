import crypto from "crypto-js";

function cryptoTokenGenerator(num) {
  try {
    return crypto.lib.WordArray.random(num).toString();
  } catch (err) {
    throw new Error('Server error');
  }
}

export default cryptoTokenGenerator;
