const express = require('express');
const auth = require('controllers/auth');
// const i18n = require('i18n');

const router = express.Router();

router.get('/', auth.adminView);

module.exports = router;
