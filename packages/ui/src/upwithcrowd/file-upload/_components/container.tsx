import {FileCard} from "@repo/ayasofyazilim-ui/organisms/file-uploader";
import {useState} from "react";
import {Rule} from "../../file-upload";
import {FileUploaderProvider, useFileUploader} from "./file-provider";
import {FileUploadBase, FileUploadBaseProps} from "./file-upload-base";
import {FileFormData, Form} from "./form";
import {SuccessedFileList} from "./success-list";

export type FileUploadContainerProps = {
  rule: Rule;
  propertyId: string;
  classNames?: {
    core?: FileUploadBaseProps["classNames"] | undefined;
    successList?: string;
  };
};

export function FileUploadContainer({rule, propertyId, classNames}: FileUploadContainerProps) {
  const [formData, setFormData] = useState<Array<FileFormData> | null>(null);
  if (!rule || !rule.mimeTypes) return null;
  const config = {
    accept: rule.mimeTypes.reduce(
      (acc, cur) => {
        const key = cur.mimeTypeCode || "";
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(cur.mimeTypeExtension || "");
        return acc;
      },
      {} as Record<string, string[]>,
    ),
    maxFileCount: rule.isMulti ? rule.maxFileCount || 5 : 1,
  };

  return (
    <FileUploaderProvider>
      <FileUploadBase
        key={rule.id}
        maxFileCount={config.maxFileCount}
        accept={config.accept}
        classNames={classNames?.core}
        formData={formData || []}
        fileCardRenderer={({file, onRemove, index}) => {
          const {pending, failed} = useFileUploader();
          const error = failed.find((x) => x.data.file.relativePath === file.relativePath);
          return (
            <div>
              <FileCard
                progress={pending.find((x) => x.data.file.relativePath === file.relativePath)?.progress || 0}
                file={file}
                onRemove={() => {
                  onRemove && onRemove();
                  setFormData((prev) => {
                    if (!prev) return null;
                    return prev.filter((_, i) => i !== index);
                  });
                }}
              />
              {error && <span className="text-xs text-red-500">{error.message}</span>}
              <Form
                rule={rule}
                validationErrors={error?.validationErrors || null}
                formData={formData?.at(index) || null}
                index={index}
                propertyId={propertyId}
                setFormData={setFormData}
              />
            </div>
          );
        }}
        label={rule.name}>
        <SuccessedFileList className={classNames?.successList} />
      </FileUploadBase>
    </FileUploaderProvider>
  );
}
