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
  id: string;
  email: string;
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
