const readTalkers = require('../helpers/readTalkers');

const filterTalkers = (req, res) => {
  const { name } = req.query;
  const talkers = readTalkers();

  if (!name || !name.length) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((t) => t.name.includes(name));

  return res.status(200).json(filteredTalkers);
};

module.exports = filterTalkers;