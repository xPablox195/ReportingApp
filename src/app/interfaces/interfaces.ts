export interface MenuComponents{
    title: string;
    description: string;
    imgUrl: string;
    urlRedirect: string;
    state: string;
}

export interface ReportApiGmail{
    pack: string;
    order: number;
    program: string;
    date: Date;
    description: string;
    user: string;
    images: string[];
    labels: string[];
}

export interface ChecksBoxs{
    name: string;
    selected: boolean;
    color: string;
  }

