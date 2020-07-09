function log(header, message) {
  console.log(`\n=[ ${header} ]=: ${message}\n`)
}

const toDollar = amount => `$${amount/100}`;

module.exports = {
  log,
  toDollar
};