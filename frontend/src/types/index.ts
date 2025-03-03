export interface Feed {
  Discover: PostProps[];
  Following: PostProps[];
  Trending: PostProps[];
  "Hot Topics": PostProps[];
}

export type FeedTab = keyof Feed;

export interface PostProps {
  id: number | string;
  username: string;
  handle: string;
  avatarSrc: string;
  content: string;
  imageSrc?: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
}
