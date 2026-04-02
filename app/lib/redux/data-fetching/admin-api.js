import { multiTenantApi } from "./root-api";

export const adminApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({})
});

export const {} = adminApi;
