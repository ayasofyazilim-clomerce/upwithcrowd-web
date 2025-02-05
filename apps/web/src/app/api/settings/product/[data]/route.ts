/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
import type {NextRequest} from "next/server";
import {getSettingServiceClient} from "src/lib";
import type {Clients} from "../../../util";
import {commonDELETE, commonGET, commonPOST, commonPUT} from "../../../util";

const clients: Clients = {
  vats: async () => {
    const client = await getSettingServiceClient();
    const vats = client.vat;
    return {
      get: async (page: number) => {
        return vats.getApiSettingServiceVat({
          maxResultCount: 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) => vats.postApiSettingServiceVat({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) => {
        return vats.putApiSettingServiceVatById({
          id,
          requestBody,
        });
      },
      delete: async (id: string) => vats.deleteApiSettingServiceVatById({id}),
    };
  },
  "product-groups": async () => {
    const client = await getSettingServiceClient();
    const productGroups = client.productGroup;
    return {
      get: (page: number) => {
        return productGroups.getApiSettingServiceProductGroup({
          maxResultCount: 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) => productGroups.postApiSettingServiceProductGroup({requestBody}),
      put: async (data: any) => {
        data.requestBody.id = data.id;
        return productGroups.putApiSettingServiceProductGroupById(data);
      },
      delete: async (id: string) => productGroups.deleteApiSettingServiceProductGroupById({id}),
    };
  },
};

export async function GET(request: NextRequest, {params}: {params: {data: string}}) {
  return commonGET(request, {params}, clients);
}

export async function POST(request: NextRequest, {params}: {params: {data: string}}) {
  return commonPOST(request, {params}, clients);
}

export async function DELETE(request: NextRequest, {params}: {params: {data: string}}) {
  return commonDELETE(request, {params}, clients);
}

export async function PUT(request: NextRequest, {params}: {params: {data: string}}) {
  return commonPUT(request, {params}, clients);
}
