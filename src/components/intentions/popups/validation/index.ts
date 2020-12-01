import * as yup from "yup";

export const PopupClientNewValidation = yup.object({
  firstName: yup.string().required("ime (naziv) je obavezno"),
});
