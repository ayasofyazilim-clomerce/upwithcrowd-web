/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
import type {
  Volo_Abp_Identity_IdentityRoleCreateDto,
  Volo_Abp_Identity_IdentityRoleUpdateDto,
} from "@ayasofyazilim/saas/IdentityService";
import type {NextRequest} from "next/server";
import {getAdministrationServiceClient, getIdentityServiceClient, getSaasServiceClient} from "src/lib";
import type {Clients} from "../../util";
import {commonDELETE, commonGET, commonPOST, commonPUT} from "../../util";

const clients: Clients = {
  role: async () => {
    const client = await getIdentityServiceClient();
    const role = client.role;
    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return role.getApiIdentityRoles({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
        });
      },
      post: async (requestBody: unknown) => {
        return role.postApiIdentityRoles({requestBody} as {
          requestBody: Volo_Abp_Identity_IdentityRoleCreateDto;
        });
      },
      put: async ({id, requestBody}: {id: string; requestBody: unknown}) =>
        role.putApiIdentityRolesById({id, requestBody} as {
          id: string;
          requestBody: Volo_Abp_Identity_IdentityRoleUpdateDto;
        }),
      delete: async (id: string) => role.deleteApiIdentityRolesById({id}),
    };
  },
  user: async () => {
    const client = await getIdentityServiceClient();
    const user = client.user;

    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        const userName = parsedFilter?.UserName;
        const name = parsedFilter?.Name;
        const surname = parsedFilter?.Surname;
        const emailAddress = parsedFilter?.EmailAddress;
        const phoneNumber = parsedFilter?.PhoneNumber;
        const isLockedOut = parsedFilter?.IsLockedOut;
        const notActive = parsedFilter?.NotActive;
        const emailConfirmed = parsedFilter?.EmailConfirmed;
        const isExternal = parsedFilter?.IsExternal;
        const maxCreationTime = parsedFilter?.MaxCreationTime;
        const minCreationTime = parsedFilter?.MinCreationTime;
        const maxModifitionTime = parsedFilter?.MaxModifitionTime;
        const minModifitionTime = parsedFilter?.MinModifitionTime;
        return user.getApiIdentityUsers({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
          userName,
          name,
          surname,
          emailAddress,
          phoneNumber,
          isLockedOut,
          notActive,
          emailConfirmed,
          isExternal,
          maxCreationTime,
          minCreationTime,
          maxModifitionTime,
          minModifitionTime,
        });
      },

      post: async (requestBody: any) => user.postApiIdentityUsers({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) => user.putApiIdentityUsersById({id, requestBody}),
      delete: async (id: string) => user.deleteApiIdentityUsersById({id}),
    };
  },
  edition: async () => {
    const client = await getSaasServiceClient();
    const edition = client.edition;
    return {
      get: async (page: number, _filter: string, _maxResultCount: unknown) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return edition.getApiSaasEditions({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
          filter,
        });
      },
      post: async (requestBody: any) => edition.postApiSaasEditions({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        edition.putApiSaasEditionsById({id, requestBody}),
      delete: async (id: string) => edition.deleteApiSaasEditionsById({id}),
    };
  },
  tenant: async () => {
    const client = await getSaasServiceClient();
    const tenant = client.tenant;

    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        const getEditionNames = parsedFilter?.GetEditionNames;
        const expirationDateMin = parsedFilter?.ExpirationDateMin;
        const expirationDateMax = parsedFilter?.ExpirationDateMax;
        const activationState = parsedFilter?.ActivationState;
        const activationEndDateMin = parsedFilter?.ActivationEndDateMin;
        const activationEndDateMax = parsedFilter?.ActivationEndDateMax;
        return tenant.getApiSaasTenants({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
          getEditionNames,
          expirationDateMin,
          expirationDateMax,
          activationState,
          activationEndDateMin,
          activationEndDateMax,
        });
      },
      post: async (requestBody: any) => tenant.postApiSaasTenants({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) => tenant.putApiSaasTenantsById({id, requestBody}),
      delete: async (id: string) => tenant.deleteApiSaasTenantsById({id}),
    };
  },
  "claim-type": async () => {
    const client = await getIdentityServiceClient();
    const claimType = client.claimType;

    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return claimType.getApiIdentityClaimTypes({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
        });
      },
      post: async (requestBody: any) => claimType.postApiIdentityClaimTypes({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        claimType.putApiIdentityClaimTypesById({id, requestBody}),
      delete: async (id: string) => claimType.deleteApiIdentityClaimTypesById({id}),
    };
  },
  applications: async () => {
    const client = await getIdentityServiceClient();
    const applications = client.applications;

    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return applications.getApiOpeniddictApplications({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
        });
      },
      post: async (requestBody: any) => applications.postApiOpeniddictApplications({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        applications.putApiOpeniddictApplicationsById({id, requestBody}),
      delete: async (id: string) => applications.deleteApiOpeniddictApplications({id}),
    };
  },
  scopes: async () => {
    const client = await getIdentityServiceClient();
    const scopes = client.scopes;

    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return scopes.getApiOpeniddictScopes({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
        });
      },

      post: async (requestBody: any) => scopes.postApiOpeniddictScopes({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        scopes.putApiOpeniddictScopesById({id, requestBody}),
      delete: async (id: string) => scopes.deleteApiOpeniddictScopes({id}),
    };
  },
  languages: async () => {
    const client = await getAdministrationServiceClient();
    const languages = client.languages;

    return {
      get: async (page: number, _filter: string) => {
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return languages.getApiLanguageManagementLanguages({
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
        });
      },
      post: async (requestBody: any) => languages.postApiLanguageManagementLanguages({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        languages.putApiLanguageManagementLanguagesById({id, requestBody}),
      delete: async (id: string) => languages.deleteApiLanguageManagementLanguagesById({id}),
    };
  },
  culture: async () => {
    const client = await getAdministrationServiceClient();
    const languages = client.languages;
    return {
      get: async () => languages.getApiLanguageManagementLanguagesCultureList(),
    };
  },
  language_set_default: async () => {
    const client = await getAdministrationServiceClient();
    const languages = client.languages;
    return {
      put: async ({id}: {id: string}) => {
        const result = await languages.putApiLanguageManagementLanguagesByIdSetAsDefault({
          id,
        });
        if (result === undefined) {
          return "success";
        }
        return result;
      },
    };
  },
  "security-logs": async () => {
    const client = await getIdentityServiceClient();
    const securityLogs = client.securityLog;

    return {
      get: async (page: number, filter: string) => {
        const parsedFilter = JSON.parse(filter || "{}");
        const userName = parsedFilter?.userName;
        const clientId = parsedFilter?.clientId;
        const identity = parsedFilter?.identity;
        const applicationName = parsedFilter?.applicationName;
        const correlationId = parsedFilter?.correlationId;
        const startTime = parsedFilter?.startTime;
        const endTime = parsedFilter?.endTime;
        return securityLogs.getApiIdentitySecurityLogs({
          maxResultCount: 10,
          skipCount: page * 10,
          userName,
          clientId,
          identity,
          applicationName,
          correlationId,
          startTime,
          endTime,
        });
      },
    };
  },

  "audit-logs": async () => {
    const client = await getAdministrationServiceClient();
    const auditLogs = client.auditLogs;

    return {
      get: async (page: number, filter: string) => {
        const parsedFilter = JSON.parse(filter || "{}");
        const userName = parsedFilter?.userName;
        const url = parsedFilter?.url;
        const clientIpAddress = parsedFilter?.clientIpAddress;
        const applicationName = parsedFilter?.applicationName;
        const correlationId = parsedFilter?.correlationId;
        const startTime = parsedFilter?.startTime;
        const endTime = parsedFilter?.endTime;
        const httpMethod = parsedFilter?.httpMethod;
        const maxExecutionDuration = parsedFilter?.maxExecutionDuration;
        const minExecutionDuration = parsedFilter?.minExecutionDuration;
        return auditLogs.getApiAuditLoggingAuditLogs({
          maxResultCount: 10,
          skipCount: page * 10,
          startTime,
          endTime,
          url,
          userName,
          applicationName,
          clientIpAddress,
          correlationId,
          httpMethod,
          maxExecutionDuration,
          minExecutionDuration,
        });
      },
    };
  },

  "text-templates": async () => {
    const client = await getAdministrationServiceClient();
    const textTemplates = client.textTemplateDefinitions;
    return {
      get: async (page: number, filter: string) => {
        const parsedFilter = JSON.parse(filter || "{}");
        const filterText = parsedFilter?.FilterText;
        return textTemplates.getApiTextTemplateManagementTemplateDefinitions({
          maxResultCount: 10,
          skipCount: page * 10,
          filterText,
        });
      },
    };
  },

  "language-texts": async () => {
    const client = await getAdministrationServiceClient();
    const languageTexts = client.languageTexts;

    return {
      get: async (page: number, _filter: string, _baseCultureName = "en", _targetCultureName = "tr") => {
        const baseCultureName = _baseCultureName as string;
        const targetCultureName = _targetCultureName as string;
        const parsedFilter = JSON.parse(_filter || "{}");
        const filter = parsedFilter?.filter;
        return languageTexts.getApiLanguageManagementLanguageTexts({
          baseCultureName,
          targetCultureName,
          maxResultCount: 10,
          skipCount: page * 10,
          filter,
        });
      },
    };
  },

  organization: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async () => organization.getApiIdentityOrganizationUnitsAll(),
      post: async (requestBody: any) => organization.postApiIdentityOrganizationUnits({requestBody}),
      put: async ({id, requestBody}: {id: string; requestBody: any}) =>
        organization.putApiIdentityOrganizationUnitsById({id, requestBody}),
      delete: async (id: string) => organization.deleteApiIdentityOrganizationUnits({id}),
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
