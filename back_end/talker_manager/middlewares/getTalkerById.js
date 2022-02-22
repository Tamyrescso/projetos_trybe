const fs = require('fs');

const getTalkerById = (req, res) => {
  const talkersJson = fs.readFileSync('talker.json', 'utf-8');
  const talkers = JSON.parse(talkersJson);

  const { id } = req.params;
  const talker = talkers.filter((t) => t.id === parseInt(id, 10));

  if (!talker.length) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
  }); 
}
  return res.status(200).json({
    name: 'Henrique Albuquerque',
    age: 62,
    id: 1,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  });
};

module.exports = getTalkerById;