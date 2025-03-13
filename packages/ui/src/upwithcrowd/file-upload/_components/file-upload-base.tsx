"use client";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {BaseFileUploaderProps, FileUploader, FileWithPath} from "@repo/ayasofyazilim-ui/organisms/file-uploader";
import {useState} from "react";
import {useFileUploader} from "./file-provider";
import {FileFormData} from "./form";
import {cn} from "../../../utils";

export type FileUploadBaseProps = {
  accept: Record<string, string[]>;
  maxFileCount: number;
  formData: FileFormData[];
  label?: string;
  description?: string;
  children?: React.ReactNode;
  fileCardRenderer?: BaseFileUploaderProps["fileCardRenderer"];
  classNames?: BaseFileUploaderProps["classNames"];
};

export function FileUploadBase({
  accept = {"*": []},
  maxFileCount = 1,
  formData,
  label,
  description,
  fileCardRenderer,
  children,
  classNames,
}: FileUploadBaseProps) {
  const {pending, setPending, setProgress, setSuccessed, setFailed} = useFileUploader();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  function handleUpload() {
    let states = formData.map((data, index) => ({
      data: {
        ...data,
        file: files[index],
      },
      progress: 0,
    }));
    setPending(states);
    Promise.allSettled(
      states.map(async ({data}) => {
        const _formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          _formData.append(key, value);
        });
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setProgress({data, progress: percentComplete});
          }
        };
        xhr.onload = function () {
          try {
            if (xhr.status === 200) {
              setSuccessed({data, message: "Uploaded successfully"});
              setFiles((prev) => prev.filter((x) => x.relativePath !== data.file.relativePath));
            } else {
              const x = JSON.parse(xhr.response);
              const message = x?.error?.code || x?.error?.message || xhr.responseText;
              console.log(x);
              setFailed({data, message, validationErrors: x?.error?.validationErrors});
            }
          } catch (error) {
            setFailed({data, message: "Unknown error"});
          }
        };
        xhr.open("POST", "/api/file", true);
        xhr.send(_formData);
      }),
    );
  }

  return (
    <FileUploader
      label={label}
      description={description}
      accept={accept}
      variant="button"
      maxSize={99999999}
      maxFileCount={maxFileCount}
      disabled={pending.length > 0}
      fileCardRenderer={fileCardRenderer}
      value={files}
      onValueChange={(_files) => {
        setFiles(_files);
      }}
      classNames={{
        collapsible: cn("bg-white", classNames?.collapsible),
        dropzoneContainer: cn("", classNames?.dropzoneContainer),
        dropzone: cn("", classNames?.dropzone),
      }}
      headerChildren={
        <Button
          className="w-full self-end sm:max-w-max"
          disabled={files.length === 0 || pending.length > 0}
          onClick={handleUpload}>
          Kaydet
        </Button>
      }>
      {children}
    </FileUploader>
  );
}
