const express = require('express');
const getTalkers = require('../middlewares/getTalkers');
const getTalkerById = require('../middlewares/getTalkerById');
const { validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDateAndRate } = require('../middlewares/validations');
const addTalker = require('../middlewares/addTalker');
const editTalker = require('../middlewares/editTalker');
const deleteTalker = require('../middlewares/deleteTalker');
const filterTalkers = require('../middlewares/filterTalkers');

const router = express.Router();

router.get('/', getTalkers);

router.get('/search', validateToken, filterTalkers);

router.get('/:id', getTalkerById);

router.use(validateToken);

router.delete('/:id', deleteTalker);

router.use(
  validateName,
  validateAge,
  validateTalk,
  validateDateAndRate,
);

router.post('/', addTalker);

router.put('/:id', editTalker);

module.exports = router;
