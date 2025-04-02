"use client";

import { useState, useCallback } from "react";

//components
import Cropper from "react-easy-crop";

//utils
import { getCroppedImg } from "@/utils/imageCrop";

interface ImageCropperProps {
  image: string;
  onCroppedImage: (image: string) => void;
}

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  onCroppedImage,
  image,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = useCallback(
    async (_: Area, croppedAreaPixels: Area) => {
      if (!image) return;
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCroppedImage(croppedImage);
    },
    [image, onCroppedImage]
  );

  return (
    <>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </>
  );
};
