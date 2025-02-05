const required = (value: string) => {
  return value.length === 0 ? { isMissing: 'is required' } : null;
}

const minLength = (value: string) => {
  return value.length < 0 ? { isMinLength: 'must be greater than 0 character' } : null;
}

const maxLength = (value: string) => {
  return value.length > 255 ? { isMaxLength: 'must be lower than 255 character' } : null;
}

const email = (value: string) => {
  return (!value.includes('@') || !value.includes('.')) ? { isInvalid: 'is invalid format' } : null;
}

const validator = {
  required,
  minLength,
  maxLength,
  email
};

export default validator;
