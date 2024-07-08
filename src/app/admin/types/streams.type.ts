interface StreamInput {
  total?: number;
  sat?: number;
  sun?: number;
  mon?: number;
  tue?: number;
  wed?: number;
  thu?: number;
  fri?: number;
}

export type Streams = {
  total_streams: number;
  week_start: string;
  week_end: string;
  apple?: StreamInput;
  spotify?: StreamInput;
  deezer?: StreamInput;
  youtube?: StreamInput;
  amazon?: StreamInput;
  tidal?: StreamInput;
  boomPlay?: StreamInput;
  tiktok?: StreamInput;
  facebook?: StreamInput;
};

const Streams = {
  total_streams: 90,
  week_start: "2024-05-25",
  week_end: "2024-05-31",
  apple: {
    total: 0,
    sat: 0,
    sun: 0,
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
  },
};
