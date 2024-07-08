import * as yup from "yup";

export const StreamsSchema = yup.object().shape({
  total_streams: yup.number().required(),
  week_start: yup.string().required(),
  week_end: yup.string().required(),
  apple: yup.object().shape({}),
  spotify: yup.object().shape({}),
  deezer: yup.object().shape({}),
  youtube: yup.object().shape({}),
  amazon: yup.object().shape({}),
  tidal: yup.object().shape({}),
  boomPlay: yup.object().shape({}),
  tiktok: yup.object().shape({}),
  facebook: yup.object().shape({}),
});
