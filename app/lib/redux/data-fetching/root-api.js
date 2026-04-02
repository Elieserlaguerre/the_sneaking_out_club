import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*
=====================
MULTI-TENANT API BASE
=====================
inject api-slice endpoints later as needed
*/

export const multiTenantApi = createApi({
	reducerPath: "multiTenantApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
	endpoints: () => ({}),
	tagTypes: ["global user registration", "global user login", "global current user", "global mission stats", "global contact us"]
});
