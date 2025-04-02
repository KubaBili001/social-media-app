"use client";

import { getPosts } from "@/actions/post";
import { CurrentUser, Post as PostType } from "@/types/types";
import { useEffect, useState } from "react";
import { Post } from "./Post";

interface PostsProps {
  currentUser: CurrentUser;
}

export const Posts: React.FC<PostsProps> = ({ currentUser }) => {
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [offset, setOffset] = useState<number>(0);
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const posts = await getPosts({
      currentUserId: currentUser.id,
      numberOfPosts: numberOfPosts,
      offset: offset,
    });

    setPosts(posts);
  };

  return (
    <div className="flex flex-col items-center">
      {!posts ? (
        <></>
      ) : (
        posts.map((post) => (
          <Post currentUser={currentUser} post={post} key={post.id} />
        ))
      )}
    </div>
  );
};
