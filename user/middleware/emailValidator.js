import { validate } from "email-validator";

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  if (!email || !validate(email)) return res.status(404).json(({ message: 'Email or password is incorrect' }));
  next()
}

export default emailValidator;
