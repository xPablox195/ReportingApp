export interface MenuComponents {
  title: string;
  description: string;
  imgUrl: string;
  urlRedirect: string;
  state: string;
}

export interface ReportApiGmail {
  pack: string;
  order: number;
  program: string;
  date: Date;
  description: string;
  user: string;
  images: string[];
  labels: string[];
}

export interface ChecksBoxs {
  name: string;
  selected: boolean;
  color: string;
  description?: string;
}


// Pending Reports
export interface Mail {
  id: string;
  threadId: string;
  labelIds: [
    string
  ];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: MessagePart;
  sizeEstimate: number;
  raw: string;
}

export interface MessagePart{
  partId: string;
  mimeType: string;
  filename: string;
  headers: Header[];
  body: MessagePartBody;
  parts: MessagePart[];
}

export interface Header{
  name: string;
  value: string;
}

export interface MessagePartBody{
  attachmentId: string;
  size: number;
  data: string;
}
