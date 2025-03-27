export type user = {
  id: string;
  email: string;
  image: string;
  password: string;
  salt: string;
  createdAt: Date;
  emailVerified: Date | null;
};

export type currentUser = {
  id: string;
  email: string;
  image: string;
  name: string;
};
