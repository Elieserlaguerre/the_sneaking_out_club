import { multiTenantApi } from "./root-api";

export const teachersApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({})
});

export const {} = teachersApi;
