export type PostType = {
  title: string;
  id: string;
  publisherId: string;
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
  }[];
};
