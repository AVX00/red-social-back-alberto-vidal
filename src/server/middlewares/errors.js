const notFound = (req, res) => {
  res.status(404).json({ error: "resource not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

module.exports = { notFound, generalError };
