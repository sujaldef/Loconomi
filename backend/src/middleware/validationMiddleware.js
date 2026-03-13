import { body, validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      })),
    });
  }
  next();
};

const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must have uppercase, lowercase, and number'),
  body('userType').isIn(['user', 'provider']).withMessage('Invalid user type'),
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateProviderSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be 8+ characters'),
  body('role')
    .isIn(['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Bakery Delivery'])
    .withMessage('Invalid role'),
  body('wage').isFloat({ min: 0 }).withMessage('Wage must be positive'),
];

const validateProviderUpdate = [
  body('availability')
    .optional()
    .isIn(['Available', 'Busy'])
    .withMessage('Invalid availability'),
  body('wage')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Wage must be positive'),
];

const validateLocationRequest = [
  body('serviceType')
    .trim()
    .isIn(['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Bakery Delivery'])
    .withMessage('Invalid service type'),
  body('location.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  body('location.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
];

export {
  validateRequest,
  validateSignup,
  validateLogin,
  validateProviderSignup,
  validateProviderUpdate,
  validateLocationRequest,
};
