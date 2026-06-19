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
	tagTypes: ["global user registration", "global user login", "global current user", "global mission stats", "global contact us", "global image management", "global user notifications", "parents family management", "parents family tree management", "parents family tree ancestors", "parents family tree root member", "parent family branches", "parent family tree branches", "parents family tree branches", "parents family tree leadership", "parents family branches", "parents search history", "parents connections", "global search history", "parents programs", "parents post", "global reactions", "global saved items", "global comments", "global replies", "global share post", "global saved posts", "global saved collections", "global add to collection", "global report saved item"]
});
