import Validator from 'validator';
import isEmpty from '../is-empty';

const validateSignupInput = (data) => {
  const errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'FirstName field is empty';
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'lastName field is empty';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 100 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is empty';
  }
  if (Validator.isEmpty(data.phone_number)) {
    errors.phone_number = 'PhoneNumber field is empty';
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is empty';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignupInput;