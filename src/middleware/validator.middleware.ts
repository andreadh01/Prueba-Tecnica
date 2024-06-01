import { check } from 'express-validator'

export const validateUser = [
  check('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía')
    .bail(),
  check('phone')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('El celular no puede estar vacío')
    .bail(),
  check('email')
    .notEmpty()
    .withMessage('El correo no puede estar vacío')
    .bail(),
  check('email')
    .isEmail()
    .withMessage('El correo no es válido')
    .bail(),
  check('phone').isMobilePhone('es-MX').withMessage('El celular no es válido'),
  check('password').isStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 0,
    pointsPerRepeat: 0,
    pointsForContainingLower: 0,
    pointsForContainingUpper: 0,
    pointsForContainingNumber: 0,
    pointsForContainingSymbol: 0
  })
]
