import { MessageCircle } from "lucide-react";

interface CommentButtonProps {
  hasUserCommented: boolean;
}

export const CommentButton: React.FC<CommentButtonProps> = ({
  hasUserCommented,
}) => {
  const handleClick = async () => {};

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {hasUserCommented ? (
        <MessageCircle className="fill-blue-500 text-blue-500 w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </div>
  );
};
