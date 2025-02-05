/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
import type {NextRequest} from "next/server";
import {getIdentityServiceClient} from "src/lib";
import type {Clients} from "../../util";
import {commonDELETE, commonGET, commonPUT} from "../../util";

const clients: Clients = {
  organizationUser: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async (page, filter, _args) => {
        return organization.getApiIdentityOrganizationUnitsByIdMembers({
          id: _args as string,
          maxResultCount: page === 0 ? 10 : page,
        });
      },
      put: async ({id, requestBody}) => {
        const _requestBody = requestBody as {userIds: string[]};
        return organization.putApiIdentityOrganizationUnitsByIdMembers({
          id,
          requestBody: _requestBody,
        });
      },
      delete: async (id) => {
        const returnObject = id as unknown as {id: string; memberId: string};
        return organization.deleteApiIdentityOrganizationUnitsByIdMembersByMemberId(returnObject);
      },
    };
  },

  organizationRole: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async (page, filter, _args) => {
        return organization.getApiIdentityOrganizationUnitsByIdRoles({
          id: _args as string,
          maxResultCount: page === 0 ? 10 : page,
        });
      },
      put: async ({id, requestBody}) => {
        const _requestBody = requestBody as {roleIds: string[]};
        return organization.putApiIdentityOrganizationUnitsByIdRoles({
          id,
          requestBody: _requestBody,
        });
      },
      delete: async (id) => {
        const returnObject = id as unknown as {id: string; roleId: string};
        return organization.deleteApiIdentityOrganizationUnitsByIdRolesByRoleId(returnObject);
      },
    };
  },

  MoveAllUsers: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      put: async ({id, requestBody}) => {
        return organization.putApiIdentityOrganizationUnitsByIdMoveAllUsers({
          id,
          organizationId: requestBody as string,
        });
      },
    };
  },

  organizationEdit: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        organization.putApiIdentityOrganizationUnitsById({id, requestBody}),
    };
  },
};

export async function GET(request: NextRequest, {params}: {params: {data: string}}) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  return commonGET(request, {params}, clients, id);
}

export async function DELETE(request: NextRequest, {params}: {params: {data: string}}) {
  return commonDELETE(request, {params}, clients);
}

export async function PUT(request: NextRequest, {params}: {params: {data: string}}) {
  return commonPUT(request, {params}, clients);
}
