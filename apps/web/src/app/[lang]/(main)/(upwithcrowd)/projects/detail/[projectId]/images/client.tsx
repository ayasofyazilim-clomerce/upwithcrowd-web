"use client";

import type {GetApiFileResponse} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putFileValidationByIdApi} from "@repo/actions/upwithcrowd/file/put-actions";
import Gallery, {type GalleryItem} from "@repo/ayasofyazilim-ui/molecules/gallery";
import {handlePutResponse} from "@repo/utils/api";
import {CheckCircle, XCircle} from "lucide-react";
import {useMemo, useState, useTransition} from "react";
import GalleryDialogFooter from "./_components/gallery-dialog-footer";

function prepareImageData(data: GetApiFileResponse) {
  return data.map((item) => ({
    id: item.fileId || "",
    imageUrl: item.fullPath || "",
    alt: item.fileDescription || "",
    isValidated: Boolean(item.isValidated),
  }));
}

function ClientPage({imageResponse}: {imageResponse: GetApiFileResponse}) {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState(() => prepareImageData(imageResponse));
  const galleryData = useMemo(() => prepareGalleryData(images), [images, prepareGalleryData]);

  function prepareGalleryData(data: (GalleryItem & {isValidated: boolean})[]) {
    return data.map((item) => ({
      ...item,
      thumbnailContent: (
        <div className="rounded-full bg-white p-1">
          {item.isValidated ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
        </div>
      ),
      dialogContent: (
        <GalleryDialogFooter fileId={item.id} handleFileValidation={handleFileValidation} isPending={isPending} />
      ),
    }));
  }

  function handleFileValidation(fileId: string, isValidated: boolean) {
    startTransition(async () => {
      const response = await putFileValidationByIdApi({
        id: fileId,
        isValidated,
      });

      if (response.type === "success") {
        const index = images.findIndex((item) => item.id === fileId);
        if (index !== -1) {
          const newImages = [...images];
          newImages[index].isValidated = isValidated;
          setImages(newImages);
        }
        handlePutResponse(response);
      }
    });
  }

  return <Gallery images={galleryData} />;
}

export default ClientPage;
