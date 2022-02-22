const readTalkers = require('../helpers/readTalkers');

const getTalkers = (_req, res) => {
  const talkers = readTalkers();

  if (!talkers.length) return res.status(200).send(talkers);
  return res.status(200).send(talkers);
};

module.exports = getTalkers;