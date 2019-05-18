const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const i18n = require('i18n');

const config = require('config');
const User = require('models/user');

const PersonSchema = require('schemas/person');
const PasswordSchema = require('schemas/password');
const LoginSchema = require('schemas/login');

// validate input data
function validateSchema(schema, obj) {
	const ajv = new Ajv({ verbose: true });
	const validObj = ajv.validate(schema, obj);

	if (!validObj) {
		const errMessage = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
		throw new Error(errMessage);
	};
};

const signupView = async (req, res, next) => {
	res.render('signup', { title: 'Sign Up', data: {}, error: false });
};

const signupAction = async (req, res, next) => {
	const { name, surname, email, password, passwordRepeat, phone, address, } = req.body;
	const personObj = {
		name: name,
		surname: surname,
		email: email,
		phone: phone,
		address: address,
	};
	const passwordObj = {
		password: password,
		passwordRepeat: passwordRepeat,
	};

	try {
		validateSchema(PersonSchema, personObj);
		// ajv = new Ajv({ verbose: true, $data: true });
		validateSchema(PasswordSchema, passwordObj);

		const emailUser = await User.findOne({ 'person.email': email});

		if (emailUser) {
			const errMessage = 'User with this e-mail exist, input other e-mail or LogIn';
			// throw new Error(errMessage);
		};

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new User({
			person: {
				name: name,
				surname: surname,
				email: email,
				phone: phone,
				address: address,
				password: passwordHash,
			},
		});
		// const user = await newUser.save();
		try {
			await User.create(newUser);
		} catch (error) {
			const message = 'User with this email exist. If it is your email, log in, please';
			res.render('signup', { title: 'Sign Up', data: personObj, error: message, });
		}

		res.render('success', { title: 'Your singUp is successeful', });
	} catch (error) {
		res.render('signup', { title: 'Sign Up', data: personObj, error: error.message, });
	}
};

const loginView = async (req, res, next) => {
	res.render('login', { title: 'Sign Up', data: {}, error: false });
};

const loginAction = async (req, res, next) => {
	const { email, password, } = req.body;
	const loginObj = {
		email: email,
		password: password,
	};

	try {
		validateSchema(LoginSchema, loginObj);

		const user = await User.findOne({ 'person.email': email, });
		if (!user) {
			throw new Error('User with this email doesn`t exist. Please, will register');
		};

		const isPasswordTrue = await bcrypt.compare(password, user.person.password);
		if (!isPasswordTrue) {
			throw new Error('You input wrong password');
		};

		req.session.userId = user.id;
		res.redirect('/home');

	} catch (error) {
		console.log(error.message);
		res.render('login', { title: 'Sign Up', data: {}, error: error.message });
	}
};

const logout = async (req, res,next) => {
	req.session.destroy(async (error) => {
		if (error) {
			return res.redirect('/home');
		};

		res.clearCookie(config.get('session:name'));
		res.redirect('/login');
	})
};

const homeView = async (req, res, next) => {
	res.render('home', { title: 'Hello user', });
};

const homeViewLang = async (req, res, next) => {
	i18n.setLocale(req, req.params.lang);
	res.render('home', { title: 'Hello', });
};

const adminView = async (req, res, next) => {
	res.render('admin', { title: 'Hello admin', data: {} });
};

module.exports.signupView = signupView;
module.exports.signupAction = signupAction;
module.exports.loginView = loginView;
module.exports.loginAction = loginAction;
module.exports.homeView = homeView;
module.exports.logout = logout;
module.exports.adminView = adminView;
module.exports.homeViewLang = homeViewLang;
