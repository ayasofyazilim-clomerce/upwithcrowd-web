"use client";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {BaseFileUploaderProps, FileUploader} from "@repo/ayasofyazilim-ui/organisms/file-uploader";
import {useState, useTransition} from "react";
export type ValidationErrors = Array<{
  members: string[];
  message: string;
}> | null;

export type FileFormData = {
  fileType: string;
  relatedEntity: string;
  property: string;
  fileDescription?: string;
  documentDate?: string;
  documentOriginator?: string;
  documentNumber?: string;
};
export type OnSuccessType = ({files, ...props}: {files: File[]} & Response) => void;
export type OnErrorType = ({
  files,
  validationErrors,
  message,
  ...props
}: {files: File[]; validationErrors: ValidationErrors; message: string} & Response) => void;
export type FileUploadBaseProps = {
  accept: Record<string, string[]>;
  maxFileCount: number;
  formData: FileFormData;
  onSuccess: OnSuccessType;
  onError: OnErrorType;
  label?: string;
  description?: string;
  backendUrl: string;
  fileCardRenderer?: BaseFileUploaderProps["fileCardRenderer"];
};
export function FileUploadBase({
  accept = {"*": []},
  maxFileCount = 1,
  formData,
  onSuccess,
  onError,
  label,
  description,
  backendUrl,
  fileCardRenderer,
}: FileUploadBaseProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSaveActive, setIsSaveActive] = useState(false);
  const [isPending, startTransition] = useTransition();
  if (!backendUrl) throw new Error("backendUrl is required");
  return (
    <FileUploader
      label={label}
      description={description}
      accept={accept}
      variant="button"
      maxFileCount={maxFileCount}
      disabled={isPending}
      fileCardRenderer={fileCardRenderer}
      onValueChange={(_files) => {
        setFiles(_files);
        _files.length > 0 ? setIsSaveActive(true) : setIsSaveActive(false);
      }}
      headerChildren={
        <Button
          className="w-full self-end sm:max-w-max"
          disabled={!isSaveActive || isPending}
          onClick={() => {
            startTransition(async () => {
              const _formData = new FormData();
              files.forEach((file) => _formData.append("files", file));
              Object.entries(formData).forEach(([key, value]) => _formData.append(key, value));
              const uploadFile = await fetch(backendUrl + "/api/file", {method: "POST", body: _formData});
              try {
                if (uploadFile.ok) {
                  onSuccess({
                    files: files,
                    ...(await uploadFile.json()),
                  });
                } else {
                  const x = await uploadFile.json();
                  onError({
                    files: files,
                    validationErrors: x?.error?.validationErrors || null,
                    message: x?.error?.message,
                    ...uploadFile,
                  });
                }
              } catch (error) {
                onError({
                  files: files,
                  validationErrors: null,
                  message: "Unknown error",
                  ...uploadFile,
                });
              }
            });
          }}>
          Kaydet
        </Button>
      }
    />
  );
}
