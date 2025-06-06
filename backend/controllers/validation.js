const { body } = require("express-validator");

const validateName = [
    body("name")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 16 })
        .withMessage(`Username must be between 1 and 16 characters`),
];

module.exports = {
    validateName,
};
