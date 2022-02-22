const fs = require('fs');
const readTalkers = require('../helpers/readTalkers');

const addTalker = (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = readTalkers();

  const newTalker = {
    name,
    id: talkers.length + 1,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  talkers.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

module.exports = addTalker;