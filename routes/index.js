const express = require('express');
const auth = require('controllers/auth');
// const i18n = require('i18n');

const router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/home');
});
router.get('/home', (req, res, next) => {
  res.redirect('/home/catalog');
});
router.get('/home/catalog', auth.catalogView);
router.get('/home/catalog/:lang', auth.catalogViewLang);

router.get('/signup', auth.signupView);
router.post('/signup', auth.signupAction);

router.get('/login', auth.loginView);
router.post('/login', auth.loginAction);

router.get('/logout', auth.logout);

// router.get('/admin/categories', auth.adminCatView);

module.exports = router;
