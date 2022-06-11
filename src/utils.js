function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  });
}

module.exports = { sleep };
