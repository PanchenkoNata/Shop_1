const personSchema = {
    "title" : "Person",
    "description" : "Person profile",
    "type" : "object",
    "propertice" : {
        "name" : {
            "description" : "User's name",
            "type" : "string",
            "minLength" : 2,
            "maxlength" : 20,
        },
        "surname" : {
            "description" : "User's surname",
            "type" : "string",
            "minLength" : 2,
            "maxlength" : 20,
        },
        "email" : {
            "description" : "User's e-mail",
            "type" : "string",
            "format" : "email",
        },
        "phone" : {
            "description" : "User's phone",
            "type" : "string",
            "pattern" : "^\\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$",
        },
        "address" : {
            "description" : "User's address",
            "type" : "string",
            "maxlength" : 200,
        },
    },
    "required" : ["name", "surname", "email", "phone"],
};

module.exports = personSchema;
