import * as yup from "yup";

export const WorkOrderNewValidation = yup.object({
  client: yup.string().required("Klijent je obavezan"),
  description: yup.string().required("Opis problema je obavezan"),
});
