const validator = {
  required: (value: string) => value.length === 0 ? { isMissing: 'is required' } : null,
  minLength: (value: string) => value.length < 0 ? { isMinLength: 'must be greater than 0 character' } : null,
  maxLength: (value: string) => value.length > 255 ? { isMaxLength: 'must be lower than 255 character' } : null,
  email: (value: string) => (!value.includes('@') || !value.includes('.')) ? { isInvalid: 'is invalid format' } : null,
};

export default validator;
