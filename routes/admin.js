const express = require('express');
const auth = require('controllers/auth');
const admin = require('controllers/admin');
// const i18n = require('i18n');

const router = express.Router();

router.get('/', admin.adminView);

router.get('/categories', admin.categView);

module.exports = router;
