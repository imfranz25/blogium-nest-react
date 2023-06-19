import { RuleObject } from 'antd/es/form';

export const requiredField = (fieldName = 'This'): RuleObject[] => [
  {
    validator(_rule, value) {
      return new Promise<void>((resolve, reject) => {
        if (value?.trim()) {
          resolve();
        } else {
          reject(`${fieldName} is required`);
        }
      });
    },
  },
];
