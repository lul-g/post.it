export type AuthPosts = {
  name: string;
  id: string;
  image: string;
  email: string;
  posts: {
    title: string;
    id: string;
    createdAt: string;
    comments?: {
      id: string;
      message: string;
      createdAt: string;
      postId: string;
      userId: string;
    }[];
  }[];
};
