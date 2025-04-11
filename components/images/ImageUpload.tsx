"use client";

//next
import { useState } from "react";

//icons
import { FaRegImage } from "react-icons/fa6";

interface ImageUploadProps {
  setImage: (arg0: string | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ setImage }) => {
  //hooks
  const [fileEnter, setFileEnter] = useState<boolean>(false);

  //handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(droppedFiles[0]);
    }
  };

  return (
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setFileEnter(true);
        }}
        onDragLeave={() => setFileEnter(false)}
        onDrop={handleDrop}
        className="flex h-full w-full items-center justify-center cursor-pointer"
      >
        <label
          htmlFor="file"
          className={`${
            fileEnter ? "text-blue-500" : ""
          } h-full w-full flex flex-col gap-2 justify-center items-center text-center cursor-pointer`}
        >
          <FaRegImage className="h-12 w-12" />
          <span>Click or drag to upload an image</span>
        </label>
        <input
          id="file"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};
