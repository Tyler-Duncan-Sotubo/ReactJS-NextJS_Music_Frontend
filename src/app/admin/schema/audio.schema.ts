import * as yup from "yup";

export const AudioUpdateSchema = yup.object().shape({
  status: yup.string(),
  smartLink: yup.string(),
  UPC: yup.string(),
  ISRC: yup.string(),
  releaseAudioLink: yup.string(),
});
