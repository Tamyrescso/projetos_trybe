const fs = require('fs');

const readTalkers = () => {
  const talkersJson = fs.readFileSync('talker.json', 'utf-8');
  const talkers = JSON.parse(talkersJson);
  return talkers;
};

module.exports = readTalkers;