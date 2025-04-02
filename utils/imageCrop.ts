import { Area } from "react-easy-crop";

export const getCroppedImg = async (image: string, croppedAreaPixels: Area) => {
  const imageObj = new Image();
  imageObj.src = image;
  await new Promise((resolve) => {
    imageObj.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    imageObj,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  const base64String = canvas.toDataURL("image/png");

  return base64String;
};
