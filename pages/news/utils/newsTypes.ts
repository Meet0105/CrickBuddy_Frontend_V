export type NewsItem = {
  newsId: string;
  headline: string;
  subHeadline?: string;
  publishedDate: string;
  category: string;
  featuredImage?: {
    url: string;
  } | null;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
};