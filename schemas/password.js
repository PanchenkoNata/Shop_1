const passwordSchema = {
    "title" : "Password",
    "description" : "Person profile",
    "type" : "object",
    "propertice" : {
        "password" : {
            "description" : "User's password",
            "type" : "string",
            "minLength" : 4,
        },
        "passwordRepeat" : {
            "description" : "User's password",
            "type" : "string",
            "minLength" : 4,
            "const" : {
                "$data" : "1/password",
            },
        },
    },
    "required" : ["password", "passwordRepeat"],
};

module.exports = passwordSchema;
