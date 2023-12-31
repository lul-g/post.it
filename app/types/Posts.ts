export type PostType = {
  title: string;
  id: string;
  publisherId: string;
  createdAt: Date;
  updatedAt: Date;
  poops: [];
  fires: [];
  user: {
    name: string;
    id: string;
    image: string;
    email: string;
  };
  comments?: {
    id: string;
    message: string;
    createdAt: string;
    postId: string;
    userId: string;
    user: {
      name: string;
      id: string;
      image: string;
      email: string;
    };
  }[];
};
