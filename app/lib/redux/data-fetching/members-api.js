import { multiTenantApi } from "./root-api";

export const membersApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({})
});

export const {} = membersApi;
