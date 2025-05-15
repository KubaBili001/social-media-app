import { MessageCircle } from "lucide-react";

interface CommentIconPRops {
  hasUserCommented: boolean;
}

export const CommentIcon: React.FC<CommentIconPRops> = ({
  hasUserCommented,
}) => {
  return (
    <>
      {hasUserCommented ? (
        <MessageCircle className="fill-blue-500 text-blue-500 w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </>
  );
};
