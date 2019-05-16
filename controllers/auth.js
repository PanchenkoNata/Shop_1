const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const User = require('models/user');

const PersonSchema = require('schemas/person');
const PasswordSchema = require('schemas/password');

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
		// validate input data
		function validateSchema(schema, obj) {
			const ajv = new Ajv({ verbose: true });
			const validObj = ajv.validate(schema, obj);

			if (!validObj) {
				const errMessage = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
				throw new Error(errMessage);
			};
		};

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
		await User.create(newUser);

		res.render('success', { title: 'Your singUp is successeful', });
	} catch (error) {
		res.render('signup', { title: 'Sign Up', data: personObj, error: error.message, });
	}
};


// const loginView = async (req, res, next) => {
// 	res.render('login', { title: 'Sign Up', data: {}, error: false });
// };
// const loginAction = async (req, res, next) => {

// };
// const signupView = async (req, res, next) => {

// };

module.exports.signupView = signupView;
module.exports.signupAction = signupAction;
