import { RuleObject, FormInstance } from 'antd/es/form';
import validator from 'validator';

export const requiredField = (fieldName = 'This'): RuleObject[] => [
  {
    validator(_rule, value) {
      return new Promise<void>((resolve, reject) => {
        if (!value || !value.trim()) {
          return reject(`${fieldName} is required`);
        }

        resolve();
      });
    },
  },
];

export const emailValidator: RuleObject[] = [
  {
    validator(_rule, value) {
      return new Promise<void>((resolve, reject) => {
        if (!value || !value.trim()) {
          return reject(`Email is required`);
        }

        if (!validator.isEmail(value)) {
          return reject(`Invalid email format`);
        }

        resolve();
      });
    },
  },
];

export const nameValidator = (fieldName: string): RuleObject[] => [
  {
    validator(_rule, value) {
      return new Promise<void>((resolve, reject) => {
        if (!value || !value.trim()) {
          return reject(`${fieldName} is required`);
        }

        if (!validator.isAlpha(value, undefined, { ignore: ' ' })) {
          return reject(`Special chars or number is not allowed`);
        }

        resolve();
      });
    },
  },
];

export const passwordValidator: RuleObject[] = [
  {
    validator(_rule, value) {
      return new Promise<void>((resolve, reject) => {
        if (!value || !value.trim()) {
          return reject(`Password is required`);
        }

        if (value.length < 8) {
          return reject(`Password must be 8 characters`);
        }

        if (validator.matches(value, /\s/)) {
          return reject(`Password must not contain spaces`);
        }

        if (!validator.isStrongPassword(value)) {
          return reject(
            `Password must have at least one special character, number, uppercase and a lowercase`
          );
        }

        resolve();
      });
    },
  },
];

export const confirmPasswordValidator = (form: FormInstance, id: string): RuleObject[] => [
  {
    validator(_rule, value) {
      return new Promise<void>((resolve, reject) => {
        const password = form.getFieldValue(id);

        if (!value || !value.trim()) {
          return reject(`Confirm password is required`);
        }

        if (value !== password) {
          return reject(`Password and confirm password does not match`);
        }

        resolve();
      });
    },
  },
];
