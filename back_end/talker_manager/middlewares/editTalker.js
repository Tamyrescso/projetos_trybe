const fs = require('fs');
const readTalkers = require('../helpers/readTalkers');

// a resolução da função dentro do findIndex foi baseada no link https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition na resposta do usuário georg
const editTalker = (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = readTalkers();
  const talkerIndex = talkers.findIndex((talker) => talker.id === id);

  const talkerUpdated = {
    id: parseInt(id, 10),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkers.splice(talkerIndex, 1, talkerUpdated);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(200).json(talkerUpdated);
};

module.exports = editTalker;