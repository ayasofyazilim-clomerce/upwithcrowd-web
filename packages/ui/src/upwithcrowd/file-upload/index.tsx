"use client";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {FileUploadBase, ValidationErrors} from "./file-upload";
import {toast} from "@repo/ayasofyazilim-ui/atoms/sonner";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export function FileUpload({ruleset, userId, propertyId}: {ruleset: Ruleset; userId: string; propertyId: string}) {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(null);
  const [formData, setFormData] = useState({});
  return (
    <div className="flex flex-col gap-4">
      {ruleset.map((rule) => {
        if (!rule || !rule.fileRelationsEntity.length) return null;
        const config = {
          accept: rule.mimeTypes.reduce(
            (acc, cur) => {
              const key = cur.mimeTypeCode.split("/")[0] + "/*";
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(cur.mimeTypeExtension);
              return acc;
            },
            {} as Record<string, string[]>,
          ),
          maxFileCount: rule.isMulti ? 3 : 1,
        };

        return (
          <FileUploadBase
            key={rule.id}
            maxFileCount={config.maxFileCount}
            accept={config.accept}
            formData={{
              RelatedEntity: rule.fileRelationsEntity[0].relatedEntityName,
              FileType: rule.namespace,
              Property: propertyId,
              ValidatedUser: userId,
              ...formData,
            }}
            onSuccess={() => {
              toast.success("File uploaded successfully");
            }}
            onError={({validationErrors, message}) => {
              setValidationErrors(validationErrors);
              toast.error(message || "File upload failed");
            }}
            label={rule.name}>
            <Form rule={rule} validationErrors={validationErrors} formData={formData} setFormData={setFormData} />
          </FileUploadBase>
        );
      })}
    </div>
  );
}

function Form({
  rule,
  validationErrors,
  formData,
  setFormData,
}: {
  rule: Ruleset[0];
  validationErrors: ValidationErrors;
  formData: object;
  setFormData: Dispatch<SetStateAction<object>>;
}) {
  const required = [
    "validatedType",
    ...(rule.numberRequired ? ["documentNumber"] : []),
    ...(rule.originatorRequired ? ["documentOriginator"] : []),
    ...(rule.dateRequired ? ["documentDate"] : []),
  ];
  const [extraErrors, setExtraErrors] = useState<Record<string, {__errors: string[]}> | undefined>(undefined);

  useEffect(() => {
    if (!validationErrors) return;
    let x = validationErrors.reduce(
      (acc, error) => {
        acc[error.members[0]] = {__errors: [error.message]};
        return acc;
      },
      {} as Record<string, {__errors: string[]}>,
    );
    if (x) setExtraErrors(x);
  }, [validationErrors]);
  return (
    <SchemaForm
      className="p-px"
      formData={formData}
      useDefaultSubmit={false}
      uiSchema={{
        "ui:className": "grid sm:grid-cols-2",
        isValidated: {
          "ui:widget": "switch",
          "ui:className": "border px-2 rounded-md flex h-9 [&>div]:h-max self-end items-center",
        },
      }}
      schema={{
        type: "object",
        required: required,
        properties: {
          fileDescription: {
            type: "string",
          },
          documentDate: {
            type: "string",
            format: "date-time",
          },
          documentNumber: {
            type: "string",
          },
          documentOriginator: {
            type: "string",
          },
          isValidated: {
            type: "boolean",
          },
          validatedType: {
            type: "string",
          },
        },
      }}
      extraErrors={extraErrors}
      onChange={({formData}) => {
        if (!formData) return;
        setFormData(formData);
        setExtraErrors(undefined);
      }}
    />
  );
}

export const dummyData = [
  {
    id: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
    fileTypeGroupId: "235e05b3-90c4-8198-3568-3a18582f6d63",
    provider: "3e21e192-3b2b-e131-90c4-3a1839a9f883",
    name: "Proje Görselleri",
    containerName: "upwithcrowd.blobcontainers.projectimages",
    filePath: "{0}/Images/",
    namespace: "ProjectImages",
    isPublic: true,
    dateRequired: true,
    isMulti: true,
    isTenant: true,
    originatorRequired: false,
    numberRequired: false,
    mimeTypes: [
      {
        id: "60c354fa-050c-2205-3533-3a184e891fe5",
        mimeTypeCode: "image/png",
        mimeTypeExtension: ".png",
      },
      {
        id: "7d09cf3c-eaa4-c382-8f0d-3a185845c822",
        mimeTypeCode: "image/jpeg",
        mimeTypeExtension: ".jpeg",
      },
    ],
    fileTypeMimeTypes: [
      {
        id: "0b51f0ed-d5b7-9181-b128-3a18583513b1",
        fileTypeId: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
        mimeTypeId: "60c354fa-050c-2205-3533-3a184e891fe5",
      },
      {
        id: "e2686cd1-67a1-7cfc-7a2e-3a1858470630",
        fileTypeId: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
        mimeTypeId: "7d09cf3c-eaa4-c382-8f0d-3a185845c822",
      },
    ],
    fileRelationsEntity: [
      {
        id: "a1a6e37c-2622-738f-591c-3a1858363b0d",
        fileTypeId: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
        relatedEntityName: "Project",
        relatedEntityProperty: "ProjectId",
        required: true,
      },
    ],
  },
  {
    id: "75e90d38-935b-14fb-b8aa-3a18584e97f4",
    fileTypeGroupId: "235e05b3-90c4-8198-3568-3a18582f6d63",
    provider: "3e21e192-3b2b-e131-90c4-3a1839a9f883",
    name: "Proje Videoları",
    containerName: "project Videos",
    filePath: "upwithcrowd.blobcontainers.filecontainer2/",
    namespace: "projectVideos",
    isPublic: true,
    dateRequired: false,
    isMulti: true,
    isTenant: false,
    originatorRequired: false,
    numberRequired: false,
    mimeTypes: [],
    fileTypeMimeTypes: [],
    fileRelationsEntity: [],
  },
];
export type Ruleset = typeof dummyData;
export * from "./handler";
