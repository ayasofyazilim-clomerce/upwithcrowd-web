"use client";

import {cn} from "../../utils";
import {FileUploadContainer, FileUploadContainerProps} from "./_components/container";

export type Rule = {
  id: string;
  fileTypeGroupId: string;
  provider: string;
  name: string;
  containerName: string;
  filePath: string;
  namespace: string;
  isPublic: boolean;
  dateRequired: boolean;
  isMulti: boolean;
  maxFileCount?: number | null;
  isTenant: boolean;
  originatorRequired: boolean;
  descriptionRequired: boolean;
  isValidationRequired: boolean;
  numberRequired: boolean;
  isFileTypeRequired: boolean;
  mimeTypes?: Array<{
    id?: string;
    mimeTypeCode?: string | null;
    mimeTypeExtension?: string | null;
  }> | null;
  fileTypeMimeTypes?: Array<{
    id?: string;
    fileTypeId?: string;
    mimeTypeId?: string;
  }> | null;
  fileRelationsEntity?: Array<{
    id?: string;
    fileTypeId?: string;
    relatedEntityName?: string | null;
    relatedEntityProperty?: string | null;
    required?: boolean;
  }> | null;
};
export type Ruleset = Rule[];
export type FileUploadProps = {
  ruleset: Ruleset;
  propertyId: string;
  classNames?: {
    container?: string;
  } & FileUploadContainerProps["classNames"];
};
export function FileUpload({ruleset, propertyId, classNames}: FileUploadProps) {
  return (
    <div className={cn("flex flex-col gap-4", classNames?.container)}>
      {ruleset.map((rule) => {
        if (!rule || !rule.fileRelationsEntity?.length) return null;
        return <FileUploadContainer rule={rule} key={rule.id} propertyId={propertyId} classNames={classNames} />;
      })}
    </div>
  );
}
