export const loginValidate = (value, cb) => {
  const errors = [];
  let isValid = true;
  if (value.trim().length === 0) {
    errors.push('Поле логин обязательное');
    isValid = false;
  }
  if (errors.length) cb(errors);
  return isValid
}

export const passwordValidate = (value, cb) => {
  const errors = [];
  let isValid = true;
  if (value.trim().length === 0) {
    errors.push('Поле пароль обязательное');
    isValid = false;
  }
  if (errors.length) cb(errors);
  return isValid
}