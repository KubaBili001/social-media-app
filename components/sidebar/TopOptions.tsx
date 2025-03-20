//icons
import { FaRegHeart } from "react-icons/fa";

//ui
import { Button } from "../ui/button";

//components
import { Input } from "../ui/input";

const TopOptions: React.FC = ({}) => {
  return (
    <div className="flex gap-3 items-center">
      {/* move input to separate component to handle search logic */}
      <Input className="md:hidden" placeholder="Search" />
      <Button
        className="flex md:hidden items-center gap-3 md:w-full p-3 rounded-md hover:cursor-pointer"
        variant={"clean"}
        size={"clean"}
      >
        <FaRegHeart className="w-6 h-6 fill-white" />
      </Button>
    </div>
  );
};

export default TopOptions;
