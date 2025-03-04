export type FileType = {
  id: string;
  fileExtension: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  creationDate: Date;
  fileLink: string;
};
export const $fileType = {
  id: {
    type: "string",
    format: "uuid",
  },
  fileType: {
    type: "string",
  },
  fileExtension: {
    type: "string",
  },
  fileName: {
    type: "string",
  },
  fileLink: {
    type: "string",
  },
  fileSize: {
    type: "number",
  },
  creationDate: {
    type: "date",
    format: "date-time",
  },
};
