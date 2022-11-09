import * as yup from "yup";
import { AppError } from "../errors/appError";

const validateEmail = async (email: string) => {
  const shape = yup.object().shape({
    email: yup.string().email().required(),
  });

  await shape.validate({ email }).catch((err) => {
    throw new AppError(err.errors, 400);
  });
};

const validatePassword = async (password: string) => {
  const shape = yup.object().shape({
    password: yup
      .string()
      .required()
      .matches(/[A-Z]/, "Must contain at least 1 capital letter")
      .matches(/([a-z])/, "Must contain at least 1 lowercase letter")
      .matches(/(\d)/, "Must contain at least 1 number")
      .matches(/(\W)|_/, "Must contain at least 1 special character")
      .matches(/.{8,}/, "Must contain at least 8 digits"),
  });

  await shape.validate({ password }, { abortEarly: false }).catch((err) => {
    throw new AppError(err.errors, 400);
  });
};

const validateZipCode = async (zipCode: string) => {
  const shape = yup.object().shape({
    zipCode: yup
      .string()
      .required()
      .matches(/^[0-9]{5}-[0-9]{3}$/, "Incorrect zip code"),
  });

  await shape.validate({ zipCode }, { abortEarly: false }).catch((err) => {
    throw new AppError(err.errors, 400);
  });
};

export { validateEmail, validatePassword, validateZipCode };
