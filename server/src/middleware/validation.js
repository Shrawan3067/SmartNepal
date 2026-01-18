import { body, query, validationResult } from 'express-validator'

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }
}

// Validation rules
export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
]

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const bookingValidation = [
  body('busId').isInt().withMessage('Valid bus ID is required'),
  body('seats').isArray().withMessage('Seats must be an array'),
  body('totalAmount').isFloat().withMessage('Valid total amount is required'),
]

export const paymentValidation = [
  body('bookingId').isInt().withMessage('Valid booking ID is required'),
  body('amount').isFloat().withMessage('Valid amount is required'),
  body('method').notEmpty().withMessage('Payment method is required'),
]