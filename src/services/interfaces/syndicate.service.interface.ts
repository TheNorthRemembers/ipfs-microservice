export interface SyndicationPost {
  token: string;
  tokenSecret?: string;
  link: string;
  pageId?: string;
  title?: string;
  image?: string;
}

// This will evolve as we implement more services
export interface ISyndicationResponse {
  [key: string]: any;
}

export interface ISyndicationService {
  syndicate: (post: SyndicationPost) => Promise<ISyndicationResponse>;
}
