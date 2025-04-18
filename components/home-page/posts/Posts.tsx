"use client";

//next
import { useEffect, useState } from "react";

//lib
import { useInView } from "react-intersection-observer";

//types
import { CurrentUser, PostWithMeta } from "@/types/types";

//ui
import { Skeleton } from "@/components/ui/skeleton";

//components
import { Post } from "./Post";
import { getPosts } from "@/actions/posts/get-posts";
import Loader from "@/components/ui/custom/Loader";

interface PostsProps {
  posts: PostWithMeta[];
  currentUser: CurrentUser;
}

export const Posts: React.FC<PostsProps> = ({ currentUser, posts }) => {
  //hooks
  const [page, setPage] = useState(2);
  const [newPosts, setNewPosts] = useState<PostWithMeta[]>(posts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    setNewPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreUsers();
    }
  }, [inView]);

  //methods

  const loadMoreUsers = async () => {
    const res = await getPosts(page);
    if (res.length === 0) {
      setHasMore(false);
    } else {
      setPage((page) => page + 1);
      setNewPosts((users) => [...users, ...res]);
    }
  };
  if (!newPosts) {
    return (
      <div className="w-[500px] flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 w-full">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <Skeleton className="w-[150px] h-[30px] rounded-md" />
        </div>
        <Skeleton className="w-full rounded-sm aspect-square" />
        <Skeleton className="w-full h-[50px]" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col divide-y gap-4 items-center w-full">
      {newPosts.map((post) => (
        <Post currentUser={currentUser} post={post} key={post.id} />
      ))}
      <div className="pb-5">
        {hasMore ? (
          <div ref={ref} className="flex">
            <Loader dark />
          </div>
        ) : (
          <span className="text-sm text-priamry">No more posts to show</span>
        )}
      </div>
    </div>
  );
};
