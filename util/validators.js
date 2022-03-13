const re_email =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports.validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email is empty';
  } else {
    if (!email.match(re_email)) {
      errors.email = 'Incorrect email';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password.length < 6) {
    errors.password = 'Password less than 6 characters';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
