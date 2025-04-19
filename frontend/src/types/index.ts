export interface Feed {
  Discover: PostProps[];
  Following: PostProps[];
  Trending: PostProps[];
  "Hot Topics": PostProps[];
}

export type FeedTab = keyof Feed;

export interface PostProps {
  id: number;
  content: string;
  handle: string;
  avatar?: string;
  displayName: string;
  createdAt: string;
  timeAgo?: string;
  image?: { url: string; alt: string } | null;
  likes? : number;
  comments?: number;
  shares?: number;
  retweets?: number;
}

// export interface PostProps {
//   id: number | string;
//   username: string;
//   handle: string;
//   avatarSrc: string;
//   content: string;
//   imageSrc?: string;
//   timeAgo: string;
//   likes: number;
//   comments: number;
//   shares: number;
// }
