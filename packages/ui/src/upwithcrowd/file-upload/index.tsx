"use client";

import {MultiSelect} from "@repo/ayasofyazilim-ui/molecules/multi-select";
import {cn} from "../../utils";
import {FileUploadContainer, FileUploadContainerProps} from "./_components/container";
import {useState} from "react";

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
    multiSelect?: string;
  } & FileUploadContainerProps["classNames"];
  children?: JSX.Element;
};
export function FileUpload({ruleset, propertyId, classNames, children}: FileUploadProps) {
  const clearedRules = ruleset.filter((rule) => rule.fileRelationsEntity?.length);
  const [visibleRuleIds, setVisibleRuleIds] = useState<string[]>([]);
  return (
    <div className={cn("flex flex-col gap-4", classNames?.container)}>
      <MultiSelect
        className={cn("border p-4 shadow-none", classNames?.multiSelect)}
        defaultValue={Object.keys(clearedRules.filter((rule) => rule.isFileTypeRequired))}
        options={clearedRules.map((rule) => ({
          label: rule.name,
          value: rule.id,
        }))}
        onValueChange={setVisibleRuleIds}
      />
      {clearedRules.map((rule) => {
        if (!rule || !visibleRuleIds.includes(rule.id)) return null;
        return <FileUploadContainer rule={rule} key={rule.id} propertyId={propertyId} classNames={classNames} />;
      })}
      {children}
    </div>
  );
}
