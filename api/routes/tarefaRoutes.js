const express = require('express');
const router = express.Router();

const tarefaController = require('../controllers/tarefaController');

router.use('/', tarefaController);

module.exports = router;