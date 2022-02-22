const fs = require('fs');
const readTalkers = require('../helpers/readTalkers');

const deleteTalker = (req, res) => {
  const { id } = req.params;

  const talkers = readTalkers();

  const talkerIndex = talkers.findIndex((talker) => talker.id === id);

  talkers.splice(talkerIndex, 1);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(204).end();
};

module.exports = deleteTalker;