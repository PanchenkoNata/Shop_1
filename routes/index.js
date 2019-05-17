const express = require('express');
const auth = require('controllers/auth');


const router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express', });
});
router.get('/home', auth.homeView);

router.get('/signup', auth.signupView);
router.post('/signup', auth.signupAction);

router.get('/login', auth.loginView);
router.post('/login', auth.loginAction);



module.exports = router;
