const { check } = require('express-validator')

const submitSupervisorValidator = [
    check('firstName')
        .isAlpha()
        .notEmpty()
        .withMessage('Enter valid first name'),
    check('lastName').isAlpha().notEmpty().withMessage('Enter valid last name'),
    check('email').isEmail().optional(true).withMessage('Enter valid email'),
    check('phoneNumber')
        .isMobilePhone('any')
        .optional(true)
        .withMessage('Enter valid phone number'),
    check('supervisor').notEmpty().withMessage('Select valid supervisor'),
]

module.exports = { submitSupervisorValidator }
