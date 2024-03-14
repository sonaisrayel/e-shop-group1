import Joi from 'joi';
const regularExpression = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$';

export const userValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp(regularExpression)),
    rePassword: Joi.ref('password'),
}).with('password', 'rePassword');

export const passwordValidationSchema = Joi.object({
    newPassword: Joi.string().pattern(new RegExp(regularExpression)),
    reNewPassword: Joi.ref('newPassword'),
}).with('newPassword', 'reNewPassword');
