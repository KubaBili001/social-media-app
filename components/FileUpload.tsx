"use client";

import { useState, useCallback } from "react";

//components
import Cropper from "react-easy-crop";

//icons
import { FaRegImage } from "react-icons/fa6";

//utils
import { getCroppedImg } from "@/utils/imageCrop";

interface FileUploadProps {
  onCroppedImage: (image: string) => void;
}

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onCroppedImage }) => {
  const [file, setFile] = useState<string | null>(null);
  const [fileEnter, setFileEnter] = useState<boolean>(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = useCallback(
    async (_: Area, croppedAreaPixels: Area) => {
      if (!file) return;
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);
      onCroppedImage(croppedImage);
    },
    [file, onCroppedImage]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result as string);
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
        setFile(reader.result as string);
      };
      reader.readAsDataURL(droppedFiles[0]);
    }
  };

  return (
    <>
      {!file ? (
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
      ) : (
        <div className="relative w-full aspect-square">
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}
    </>
  );
};
