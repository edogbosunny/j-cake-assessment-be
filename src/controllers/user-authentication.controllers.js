import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenMiddleware from '../utils/lib/get-token';

import UserAuthenticationRepository from '../repositories/user-authentication.repository';
import validateSignupInput from '../utils/validations/sign-up.validations';
import validateLoginInput from '../utils/validations/sign-in.validations';

const signupUser = async (req, res) => {
  const { password, first_name, last_name, phone_number, is_admin, country, email } = req.body;
  // if (req.body.is_admin === undefined) {

  // }
  const genSalt = bcrypt.genSaltSync(8);
  const hashPassword = bcrypt.hashSync(password, genSalt);

  const updatedUserResponse = {
    first_name,
    last_name,
    phone_number,
    password: hashPassword,
    is_admin,
    country,
    email
  }

  try {
    const { errors, isValid } = validateSignupInput(updatedUserResponse);
    const checkExistingUser = await UserAuthenticationRepository.get({ email });
    if (!isValid) {
      return res.status(401).send({
        message: 'invalid parameters entered',
        errors
      })
    }
    else if (checkExistingUser.length !== 0) {
      return res.status(409).send({
        message: 'User already exists',
      });
    }

    else {
      const data = await UserAuthenticationRepository.signUp(updatedUserResponse)
      const token = tokenMiddleware.getToken(data._id, data.is_admin);
      return res.status(200).send({
        message: 'User created successfully',
        token,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Internal server error',
      errors: error.message
    });
  }

};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(401).send({
      message: 'Email or password incorrect',
      errors
    })
  }
  try {
    const user = await UserAuthenticationRepository.login({ email });
    if (!bcrypt.compareSync(password, user[0].password) || !user) {
      return res.status(401).send({
        message: 'Email or password incorrect',
        errors
      });
    }
    const token = await tokenMiddleware.getToken(user._id, user.is_admin);
    return res.status(200).send({
      message: 'login succesfull',
      token
    })

  } catch (errors) {
    console.log(errors)
    return res.status(500).send({
      message: 'Internal server error',
      errors
    });
  }

}

export default {
  signupUser,
  login
};
