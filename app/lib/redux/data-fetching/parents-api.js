import { multiTenantApi } from "./root-api";

export const parentApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({})
});

export const {} = parentApi;
