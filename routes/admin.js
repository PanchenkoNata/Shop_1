const express = require('express');
const auth = require('controllers/auth');
const admin = require('controllers/admin');
// const i18n = require('i18n');

const router = express.Router();

router.get('/', admin.adminView);

router.get('/categories', admin.categView);
router.get('/superCategories', admin.superCategView);

router.get('/categories/add', admin.addCategView);
router.post('/categories/add', admin.addCategAction);
router.get('/categories/update/:id', admin.updCategView);
router.post('/categories/update/:id', admin.updCategAction);

router.get('/superCategories/add', admin.addSuperCategView);
router.post('/superCategories/add', admin.addSuperCategAction);
router.get('/superCategories/update/:id', admin.updSuperCategView);
router.post('/superCategories/update/:id', admin.updSuperCategAction);



module.exports = router;
