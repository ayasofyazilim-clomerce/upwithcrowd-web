"use client";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {FileUploader} from "@repo/ayasofyazilim-ui/organisms/file-uploader";
import {useState, useTransition} from "react";
export type ValidationErrors = Array<{
  members: string[];
  message: string;
}> | null;

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
  formData: Record<string, boolean | string | number>;
  onSuccess: OnSuccessType;
  onError: OnErrorType;
  children: React.ReactNode;
  label?: string;
  description?: string;
};
export function FileUploadBase({
  accept = {"*": []},
  maxFileCount = 1,
  formData,
  onSuccess,
  onError,
  children,
  label,
  description,
}: FileUploadBaseProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSaveActive, setIsSaveActive] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <FileUploader
      label={label}
      description={description}
      accept={accept}
      variant="button"
      maxFileCount={maxFileCount}
      disabled={isPending}
      noDrag={true}
      onValueChange={(_files) => {
        setFiles(_files);
        _files.length > 0 ? setIsSaveActive(true) : setIsSaveActive(false);
      }}>
      <div className="flex w-full flex-col justify-between gap-2">
        {children}
        <Button
          className="w-full self-end sm:max-w-max"
          disabled={!isSaveActive || isPending}
          onClick={() => {
            startTransition(async () => {
              const _formData = new FormData();
              files.forEach((file) => _formData.append("files", file));
              _formData.append("fileProps", JSON.stringify(formData));
              const uploadFile = await fetch("/api/file", {method: "POST", body: _formData});
              console.log("up", uploadFile);
              if (uploadFile.ok) {
                onSuccess({
                  files: files,
                  ...(await uploadFile.json()),
                });
              } else {
                const x = await uploadFile.json();
                console.log(x, x.error);
                onError({
                  files: files,
                  validationErrors: x?.error?.validationErrors || null,
                  message: x?.error?.message,
                  ...uploadFile,
                });
              }
            });
          }}>
          Kaydet
        </Button>
      </div>
    </FileUploader>
  );
}
