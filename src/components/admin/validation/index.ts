import * as yup from "yup";

export const UserNewValidation = yup.object({
  username: yup.string().required("Korisničko ime je obavezno"),
  password: yup.string().required("Lozinka je obavezna"),
});
