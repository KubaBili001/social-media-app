"use client";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";

export const FileUpload = () => {
  const [file, setFile] = useState<string>();
  const [fileEnter, setFileEnter] = useState(false);
  return (
    <>
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    let blobUrl = URL.createObjectURL(file);
                    setFile(blobUrl);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className={`${
            fileEnter ? "" : ""
          } flex h-full w-full items-center justify-center cursor-pointer`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col gap-2 justify-center items-center text-center"
          >
            <FaRegImage className="h-12 w-12" />
            <span>Click or drag to upload an image</span>
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              let files = e.target.files;
              if (files && files[0]) {
                let blobUrl = URL.createObjectURL(files[0]);
                setFile(blobUrl);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <object
            className="rounded-md w-full max-w-xs h-72"
            data={file}
            type="image/png"
          />
        </div>
      )}
    </>
  );
};
