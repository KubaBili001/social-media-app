export type user = {
  id: string;
  email: string;
  photo: string;
  password: string;
  salt: string;
  createdAt: Date;
  emailVerified: Date | null;
};

export type currentUser = {
  id: string;
  email: string;
  photo: string;
  name: string;
};
