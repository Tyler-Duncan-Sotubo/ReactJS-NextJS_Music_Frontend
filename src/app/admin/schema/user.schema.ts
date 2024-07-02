import * as yup from "yup";

export const UserUpdateSchema = yup.object().shape({
  name: yup.string(),
  email_verified: yup.boolean(),
  role: yup.string(),
  email: yup.string(),
});
