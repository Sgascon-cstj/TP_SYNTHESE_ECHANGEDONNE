import expressValidator from 'express-validator';
const { body } = expressValidator;

class CustomerValidator {

    complete() {
        return [
            
            body('name').exists().withMessage('Requis').bail()
                .isAscii().withMessage('Caracters must be in ASCII table').bail(),
            body('email').exists().withMessage('Requis').bail(),
            body('planet').exists().withMessage('Requis').bail()
                .isAlphanumeric().withMessage('Name can only contain (a-z, A-Z, 0-9)').bail(),
            body('coord.lat').exists().withMessage('Requis').bail()
                .isFloat({ min: -1000, max: 1000 }).withMessage('Value must be between -1000 and 1000').bail(),
            body('coord.lon').exists().withMessage('Requis').bail()
                .isInt({ min: -1000, max: 1000 }).withMessage('Value must be between -1000 and 1000').bail(),
            body('phone').exists().withMessage('Requis').bail()
                .isHexadecimal().withMessage('Must be hexadecimal value').bail()
                .isLength({ min: 16, max: 16 }).withMessage('Must be 16 characters long').bail(),
            body('birthday').exists().withMessage('Requis').isISO8601().toDate().withMessage('Must me date formet YYYY-MM--DD').bail()
        ]
    }
}

export default new CustomerValidator();