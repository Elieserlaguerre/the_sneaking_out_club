import { multiTenantApi } from "./root-api";

export const parentApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({
		addFamilyMember: build.mutation({
			query: (formData) => ({
				url: "/parents/family",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "parents family management" }],
			transformErrorResponse: (results) => results.data.message
		})
	})
});

export const { useAddFamilyMemberMutation } = parentApi;
