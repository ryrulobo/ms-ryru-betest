const generateAccountNumber = (length = 12) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};

module.exports = { generateAccountNumber };
