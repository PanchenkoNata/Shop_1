const loginSchema = {
	"title" : "Login",
	"description" : "Login user",
	"type" : "object",
	"properties" : {
		"email" : {
			"description" : "User email",
			"type" : "string",
			"format" : "email",
		},
		"password" : {
			"description" : "User password",
			"type" : "string",
			"minLength" : 4,
		},
	},
	"required" : ["email", "password"],
};

module.exports = loginSchema;
