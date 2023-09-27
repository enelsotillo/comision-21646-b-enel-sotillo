import { body } from "express-validator";

export const crearTaskSchema = [
    body('title')
        .isString().withMessage('Debe ser String')
        .notEmpty().withMessage('no debe ser vacio'),
    body('description')    
        .isString().withMessage('Debe ser String')
        .notEmpty().withMessage('no debe ser vacio'),
    body('poster')
        .isURL().withMessage('Ingrese una URL valida')
        .notEmpty().withMessage('no debe ser vacio')
]

export const editTaskSchema = [
        body('title')
        .optional()
        .isString().withMessage('Debe ser String')
        .notEmpty().withMessage('no debe ser vacio'),
        body('description')
        .optional()    
        .isString().withMessage('Debe ser String')
        .notEmpty().withMessage('no debe ser vacio'),
        body('poster')
        .optional()
        .isURL().withMessage('Ingrese una URL valida')
        .notEmpty().withMessage('no debe ser vacio')
]