"use client";

import { CurrentUser, PostWithMeta } from "@/types/types";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { usePathname } from "next/navigation";
import { getPosts } from "@/actions/posts/get-posts";

interface PostsProps {
  currentUser: CurrentUser;
}

export const Posts: React.FC<PostsProps> = ({ currentUser }) => {
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [offset, setOffset] = useState<number>(0);
  const [posts, setPosts] = useState<PostWithMeta[] | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    getUserPosts();
  }, [pathname]);

  const getUserPosts = async () => {
    const posts = await getPosts({
      currentUserId: currentUser.id,
      numberOfPosts: numberOfPosts,
      offset: offset,
    });

    setPosts(posts);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {!posts ? (
        <>as</>
      ) : (
        posts.map((post) => (
          <Post currentUser={currentUser} post={post} key={post.id} />
        ))
      )}
    </div>
  );
};
