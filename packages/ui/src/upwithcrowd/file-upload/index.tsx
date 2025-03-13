"use client";

import {cn} from "../../utils";
import {FileUploadContainer, FileUploadContainerProps} from "./_components/container";

export type Ruleset = typeof dummyData;
export type FileUploadProps = {
  ruleset: Ruleset;
  propertyId: string;
  classNames?: {
    container?: string;
  } & FileUploadContainerProps["classNames"];
};
export function FileUpload({ruleset = dummyData, propertyId, classNames}: FileUploadProps) {
  return (
    <div className={cn("flex flex-col gap-4", classNames?.container)}>
      {ruleset.map((rule) => {
        if (!rule || !rule.fileRelationsEntity.length) return null;
        return <FileUploadContainer rule={rule} key={rule.id} propertyId={propertyId} classNames={classNames} />;
      })}
    </div>
  );
}

export const dummyData = [
  {
    id: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
    fileTypeGroupId: "6a91ab68-9b24-4f99-a8f0-4fbd2cc040d6",
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
    isRequired: true,
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
      {
        id: "48f876d4-ca9c-5607-1a0c-3a189695abac",
        fileTypeId: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
        relatedEntityName: "3",
        relatedEntityProperty: "3",
        required: true,
      },
      {
        id: "26d0d3a0-6031-44f3-a45b-ba97c52f19b6",
        fileTypeId: "541ec6d9-2ecc-3830-ab5d-3a185832af2e",
        relatedEntityName: "Project_",
        relatedEntityProperty: "ProjectId_",
        required: true,
      },
    ],
  },
  {
    isRequired: false,
    id: "75e90d38-935b-14fb-b8aa-3a18584e97f4",
    fileTypeGroupId: "6a91ab68-9b24-4f99-a8f0-4fbd2cc040d6",
    provider: "3e21e192-3b2b-e131-90c4-3a1839a9f883",
    name: "Proje Videoları",
    containerName: "upwithcrowd.blobcontainers.projectimages",
    filePath: "{0}/Videos/",
    namespace: "projectVideos",
    isPublic: true,
    dateRequired: true,
    isMulti: true,
    isTenant: false,
    originatorRequired: true,
    numberRequired: true,
    mimeTypes: [
      {
        id: "c27cae50-0c3c-eedb-3696-3a189c23aa4b",
        mimeTypeCode: "video/mp4",
        mimeTypeExtension: ".mp4",
      },
    ],
    fileTypeMimeTypes: [
      {
        id: "37b9d122-33a2-755d-65ca-3a189c252636",
        fileTypeId: "75e90d38-935b-14fb-b8aa-3a18584e97f4",
        mimeTypeId: "c27cae50-0c3c-eedb-3696-3a189c23aa4b",
      },
    ],
    fileRelationsEntity: [
      {
        id: "2ae132f5-0dc5-8efc-8f4a-3a189c270c03",
        fileTypeId: "75e90d38-935b-14fb-b8aa-3a18584e97f4",
        relatedEntityName: "Project",
        relatedEntityProperty: "projectId",
        required: true,
      },
    ],
  },
];
