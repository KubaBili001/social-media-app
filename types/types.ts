export type FullUser = {
  id: string;
  email: string;
  image: string;
  password: string;
  salt: string;
  createdAt: Date;
  emailVerified: Date | null;
};

export type CurrentUser = {
  email: string;
} & User;

export type User = {
  id: string;
  image: string;
  name: string;
};

export type Post = {
  id: number;
  createdBy: string;
  photo: string;
  text: string | null;
  postedDate: Date;
};

export type PostWithMeta = {
  id: number;
  createdBy: string;
  photo: string;
  text: string | null;
  postedDate: Date;

  user: {
    id: string;
    name: string | null;
    image: string | null;
  };

  hasLiked: boolean;
  likesCount: number;
  commentsCount: number;
  hasCommented: boolean;
};
