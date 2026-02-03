const validator = require("validator");

const validUser = async(data)=>{

     const mandatoryField = ['firstName', 'emailId', 'password'];

    const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));
    if (!IsAllowed) throw new Error("Field missing");

    if (data.firstName.length < 3 || data.firstName.length > 20) throw new Error("firstName must be 3–20 characters");

    if (!validator.isEmail(data.emailId)) throw new Error("Invalid Email")

    if (!validator.isStrongPassword(data.password)) throw new Error("Enter a strong password and Password must be at least 8 characters and include uppercase, lowercase, number, and symbol");
}

module.exports = validUser;