import * as yup from "yup";

export const SubscriptionUpdateSchema = yup.object().shape({
  status: yup.string(),
  plan: yup.string(),
});
